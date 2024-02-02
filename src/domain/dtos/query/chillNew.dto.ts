export class ChillNewsDto {

    constructor(
        public userId : string,
        public avatar : string,
        public chillNewContent : string
    ){}

    static create(object : {[key : string] : any}) : [string?, ChillNewsDto?] {
        
        const { userId, avatar, content } = object;

            if( !userId || !avatar || !content ) return ["Todos los campos son obligatorios"];

            return [
                undefined,
                new ChillNewsDto(
                    userId,
                    avatar,
                    content
                )
            ]
    }
}