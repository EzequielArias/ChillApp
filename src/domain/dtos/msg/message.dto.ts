
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

export class DeleteMessageDto {
    constructor(
        public id : string,
        public chatId : string
    ){}

    static create( object : {[key : string] : any }) : [ string?, DeleteMessageDto? ] {
        
        const { id, chatId } = object;

        if(!id) return ["ID is undefined or invalid"];

        return [
            undefined,
            new DeleteMessageDto(
                id,
                chatId
            )
        ]
    }
}

export class EditMsgDto {

    constructor(
        public chatId : string,
        public messageId : string,
        public data : string
    ){}

    static create( object : {[key : string] : any }) : [ string?, EditMsgDto? ] {
        const { chatId, messageId, data } = object;

        if(!chatId || !messageId || !data ) return ["Se necesita un chatID y un messageId o data"];

        return [
            undefined,
            new EditMsgDto(
                chatId,
                messageId,
                data
            )
        ]
    }
}