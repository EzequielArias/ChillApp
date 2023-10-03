export class MessageEntity {
    constructor(
        public text : string,
        public senderId : string,
        public receiverId : string,
    ){}
}