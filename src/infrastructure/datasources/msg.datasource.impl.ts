import { ChatEntity, MessageDto, MessageEntity, ChatsDto} from "../../domain";
import { MessageDatasource } from "../../domain/datasource/";
import { ChatModel, MsgSchema } from "../../databases/mongodb";
import { MessageMapper } from "../mappers";


export class MessageDatasourceImpl implements MessageDatasource {

    constructor(){}

    async getChats( ChatsDto : ChatsDto ): Promise<ChatEntity[]> {

        const { userUUID } = ChatsDto;

        const myChats : any = await ChatModel.find({ owners : userUUID });

        return MessageMapper.chatEntityFromObject( myChats );
    }

    async sendMsg(MessageDto: MessageDto): Promise<MessageEntity> {
       
        const { text, senderId, receiverId } = MessageDto;
        
        const exists = await ChatModel.findOne()
                                      .where('owners')
                                      .all([senderId, receiverId])


        const newMessage = await MsgSchema.create({
            user : senderId,
            text
        });

        if(!exists){
             const newChat = await ChatModel.create({
                owners : [senderId, receiverId]
            })

            newChat.messages.push(newMessage);

            await newChat.save();

            return MessageMapper.msgEntityFromObject({
                text : newChat.messages,
                senderId : newChat.owners[0],
                receiverId : newChat.owners[1]
            });
        }

        exists.messages.push(newMessage);

        await exists.save();

        return MessageMapper.msgEntityFromObject({
            text : exists.messages,
            senderId,
            receiverId
        })
    }

}