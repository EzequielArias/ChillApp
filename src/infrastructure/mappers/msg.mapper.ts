import { CustomErr, MessageEntity, ChatEntity } from "../../domain";

import { Document, Types } from 'mongoose';

// Define la interfaz para el mensaje
interface IMessage extends Document{
  text: string;
  user: Types.ObjectId; // Puedes ajustar el tipo según tus necesidades
}

// Define la interfaz para el modelo de Chat
interface IChat extends Document {
  owners: [Types.ObjectId, Types.ObjectId]; // Puedes ajustar el tipo según tus necesidades
  messages: IMessage[];
}


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

    static chatEntityFromObject( object : IChat[] ) : ChatEntity[] {

        // Tengo que ver como devuelve los resultados...
        const cleanChats = object
        .filter((el) => el._id && el.messages.length !== 0)
        .map((el) => {
            return {
                _id : el._id,
                owners : el.owners,
                messages : el.messages.map(el => {
                    return {
                        user : el.user,
                        text : el.text
                    }
                })           
            }
        })
        return cleanChats;

    }
}