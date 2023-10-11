import { Document, Types } from "mongoose";

export class MessageEntity {
    constructor(
        public text : string,
        public senderId : string,
        public receiverId : string,
    ){}
}

interface Message {
    user: Types.ObjectId; // Tipo debe coincidir con el tipo de ObjectId utilizado en tu User model
    text: string;
}
  
export interface ChatEntity {
    _id : Types.ObjectId;
    owners: [ Types.ObjectId, Types.ObjectId ]; // Tipo debe coincidir con el tipo de ObjectId utilizado en tu User model
    messages: Message[];
}
