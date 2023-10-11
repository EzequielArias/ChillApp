
export class ChatsDto {
    
    constructor(
        public userUUID : string
    ){}

    static create(object : {[key : string] : any}) : [ string?, ChatsDto? ]{

        const { user } = object;

        if(!user._id) return ['user UUUID not Found']

        const userUUID = user._id;
        
        return [
            undefined,
            new ChatsDto(
                userUUID
                )
        ]
    }
}