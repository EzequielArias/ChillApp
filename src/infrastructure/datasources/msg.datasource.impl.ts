import { ChatEntity, MessageDto, MessageEntity, ChatsDto, NewChatDto, DeleteMessageDto, DeleteMessageEntity, GetChatByIdDto, EditMsgDto} from "../../domain";
import { MessageDatasource } from "../../domain/datasource/";
import { ChatModel, MsgSchema } from "../../databases/mongodb";
import { MessageMapper } from "../mappers";

export class MessageDatasourceImpl implements MessageDatasource {

    constructor(){}

    async newChat( NewChatDto: NewChatDto ): Promise<ChatEntity> {
            const { userId1, userId2 } = NewChatDto;

            const exists = await ChatModel.findOne({
                $or: [
                    {
                        $and: [
                            { 'owners.owner1': userId1 },
                            { 'owners.owner2': userId2 }
                        ]
                    },
                    {
                        $and: [
                            { 'owners.owner1': userId2 },
                            { 'owners.owner2': userId1 }
                        ]
                    }
                ]
            });   

            if(exists){
                return MessageMapper.newChatEntityFromObject( exists );
            } 

            const newChat = await ChatModel.create({
                owners : {
                    owner1 : userId1,
                    owner2 : userId2
                }
            })

            await newChat.save();

            return MessageMapper.newChatEntityFromObject( newChat );

    }

    async getChats( ChatsDto : ChatsDto ): Promise<any[]> {

        const { userUUID } = ChatsDto;

        const myChats = await ChatModel.find({ 
            $or : [
                { 'owners.owner1' : userUUID },
                { 'owners.owner2' : userUUID }
            ]
        }).populate('owners.owner1 owners.owner2', 'name email _id img')


        return MessageMapper.chatEntityFromObject( myChats );
    }

    async sendMsg( MessageDto: MessageDto ): Promise<MessageEntity> {
       
        const { text, senderId, receiverId } = MessageDto;

        const exists = await ChatModel.findOne({
            $or: [
                {
                    $and: [
                        { 'owners.owner1': senderId },
                        { 'owners.owner2': receiverId }
                    ]
                },
                {
                    $and: [
                        { 'owners.owner1': receiverId },
                        { 'owners.owner2': senderId }
                    ]
                }
            ]
        });                 

        const newMessage = await MsgSchema.create({
            user : senderId,
            text
        });

        if(!exists){
             const newChat = await ChatModel.create({
                owners : {
                    owner1 : senderId,
                    owner2 : receiverId
                }
            })
            
            newChat.messages.push({
                id : newMessage._id,
                text : newMessage.text,
                user : newMessage.user
            });

            await newChat.save();

            return MessageMapper.msgEntityFromObject({
                id : newMessage._id,
                text : newChat.messages,
                senderId : newChat.owners?.owner1,
                receiverId : newChat.owners?.owner2
            });
        }

        exists.messages.push({
            id : newMessage._id,
            text : newMessage.text,
            user : newMessage.user
        });

        await exists.save();

        const lastMessage = exists.messages[exists.messages.length - 1]

        return MessageMapper.msgEntityFromObject({
            id : newMessage._id,
            text : lastMessage.text,
            senderId,
            receiverId
        })
    }

    async deleteMsg( DeleteMessageDto: DeleteMessageDto): Promise<DeleteMessageEntity> {
       const { id, chatId } = DeleteMessageDto;

      
       const exists = await ChatModel.findOne({ _id : chatId }).exec();

        if(!exists) return { message : "No se encontro el message"};

        exists.messages = exists.messages.filter(msg =>{
            if(msg._id?.toString() != id) return msg;
        }) as any;

        await exists.save();

        return { message : `El mensaje ${id} fue eliminado`};
    }

    async getByIdChat(GetChatByIdDto: GetChatByIdDto): Promise<ChatEntity> {
        
        const { id } = GetChatByIdDto;

        const exists = await ChatModel.findOne({ _id : id}).exec();


        if(!exists) return "error" as any;
        
        return MessageMapper.chatByIdFromObject( exists );
    }

    async editMsg( EditMsg: EditMsgDto ): Promise<MessageEntity> {

        const { chatId, messageId, data } = EditMsg;

        const exists = await ChatModel.findOne({ _id : chatId }).exec();

        if(!exists) return "asd" as any;

        exists.messages.map(el => {
            if(el._id?.toString() === messageId){
                el.text = data
            }

            return el
        })
        
        await exists.save();

        const msg = exists.messages.find(el => el._id?.toString() === messageId);

        return MessageMapper.msgEntityFromObject({
            id : msg?._id,
            text : msg?.text,
            senderId : exists.owners?.owner1,
            receiverId : exists.owners?.owner2
        });
    }
}