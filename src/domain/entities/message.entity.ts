import { Document, Types } from "mongoose";

export class MessageEntity {
    constructor(
        public id : string,
        public text : string,
        public senderId : string,
        public receiverId : string,
    ){}
}

interface Message {
    _id : Types.ObjectId | string
    user: Types.ObjectId | string; // Tipo debe coincidir con el tipo de ObjectId utilizado en tu User model
    text: string;
}
  
export interface ChatEntity {
    _id : Types.ObjectId;
    owners: [ Types.ObjectId, Types.ObjectId ] | any; // Tipo debe coincidir con el tipo de ObjectId utilizado en tu User model
    messages: Message[];
}

export class DeleteMessageEntity {
    constructor(
        public message : string
    ){}
}