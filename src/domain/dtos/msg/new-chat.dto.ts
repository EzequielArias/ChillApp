
export class NewChatDto {
    
    constructor(
        public userId1 : string,
        public userId2 : string
    ){}

    static create(object : {[key : string] : any}) : [ string?, NewChatDto? ]{

        const { userId1 , userId2} = object;

        if( !userId1 || !userId2 ) return ['two diferents uuid are needed']

         
        return [
            undefined,
            new NewChatDto(
                userId1,
                userId2
            )
        ]

    }   
}