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


type Owner = {
    _id: string;
    name: string;
    email: string;
    img: string;
  };
  
  type Message = {
    // Define la estructura de un mensaje si es necesario.
  };
  
  type MyObject = {
    owners: {
      owner1: Owner;
      owner2: Owner;
    };
    _id: string;
    messages: Message[];
    __v: number;
  };

export class MessageMapper {
   
    static msgEntityFromObject(object : {[key : string] : any }) : MessageEntity {

        const { text, senderId, receiverId, id } = object;

        if(!id) throw CustomErr.badRequest("El mensaje debe llevar un ID");

        if(!text) throw CustomErr.badRequest('Missing message');

        if(!senderId || !receiverId) throw CustomErr.badRequest('Sender or Receiver invalid');

        if( text.length < 1 ){
            return new MessageEntity(
                id,
                text[0].message,
                senderId,
                receiverId
            )
        }

        return new MessageEntity(
            id,
            text,
            senderId,
            receiverId
        )

    }

    static chatEntityFromObject( object : Document[] )  {

      // Tengo que ver como devuelve los resultados...
        const documents = object.map((doc) => {
            const owners: {
                owner1: Owner;
                owner2: Owner;
              } = {
                owner1: {
                  _id: doc.get('owners.owner1._id'),
                  name: doc.get('owners.owner1.name'),
                  email: doc.get('owners.owner1.email'),
                  img: doc.get('owners.owner1.img')
                },
                owner2: {
                  _id: doc.get('owners.owner2._id'),
                  name: doc.get('owners.owner2.name'),
                  email: doc.get('owners.owner2.email'),
                  img: doc.get('owners.owner2.img')
                },
              };

              return {
                  owners,
                  _id: doc.get('_id'),
                  messages: doc.get('messages'),
                  __v: doc.get('__v')
              };
        })

        return documents;
        
    }

    static newChatEntityFromObject( object : {[key : string] : any} ) : ChatEntity {
        const { owners, messages, _id } = object;

        return {
            owners, messages, _id 
        }
    }

    static chatByIdFromObject ( object : Document ) : ChatEntity {
      
      const owners: {
        owner1: Owner;
        owner2: Owner;
      } = {
        owner1: {
          _id: object.get('owners.owner1._id'),
          name: object.get('owners.owner1.name'),
          email: object.get('owners.owner1.email'),
          img: object.get('owners.owner1.img')
        },
        owner2: {
          _id: object.get('owners.owner2._id'),
          name: object.get('owners.owner2.name'),
          email: object.get('owners.owner2.email'),
          img: object.get('owners.owner2.img')
        },
      };

      return {
          owners,
          _id: object.get('_id'),
          messages: object.get('messages')
      };
    }
}