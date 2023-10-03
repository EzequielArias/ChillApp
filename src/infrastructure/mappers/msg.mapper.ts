import { CustomErr, MessageEntity } from "../../domain";



export class MessageMapper {
   
    static msgEntityFromObject(object : {[key : string] : any }) : MessageEntity {

        const { text, senderId, receiverId } = object;

        if(!text) throw CustomErr.badRequest('Missing message');

        if(!senderId || !receiverId) throw CustomErr.badRequest('Sender or Receiver invalid');


        if( text.length < 1 ){
            return new MessageEntity(
                text[0].message,
                senderId,
                receiverId
            )
        }

        return new MessageEntity(
            text.at(-1).message,
            senderId,
            receiverId
        )

    }
}