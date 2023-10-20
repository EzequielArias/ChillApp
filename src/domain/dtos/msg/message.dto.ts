
export class MessageDto {
    constructor(
        public text : string,
        public senderId : string,
        public receiverId : string
    ){}

    static create(object : {[key : string] : any}) : [string?, MessageDto?]{

        const { text, senderId, receiverId } = object;

        if( !senderId || !receiverId ) return ["Credentials invalid"];
        if( !text ) return ["Missing text content"];

        return [
            undefined,
            new MessageDto(
                text,
                senderId,
                receiverId
            )
        ]
    }
}