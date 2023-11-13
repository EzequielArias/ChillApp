import { ChatEntity, MessageDto, MessageEntity, ChatsDto, NewChatDto} from "../../domain";
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

            newChat.messages.push(newMessage);

            await newChat.save();

            return MessageMapper.msgEntityFromObject({
                text : newChat.messages,
                senderId : newChat.owners?.owner1,
                receiverId : newChat.owners?.owner2
            });
        }

        exists.messages.push(newMessage);

        await exists.save();

        const lastMessage = exists.messages[exists.messages.length - 1]

        return MessageMapper.msgEntityFromObject({
            text : lastMessage.text,
            senderId,
            receiverId
        })
    }

}