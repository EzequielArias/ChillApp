export class QueryDto {

    constructor(
        public email? : string,
        public name? : string
    ){}

    static create(object : {[key : string] : any}) : [string?, QueryDto?] {

        const { email, name } = object;

        const expresionRegularEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!name && !email) return ["Se necesita un parametro de busqueda"];

        if(expresionRegularEmail.test(email)){
            return [
                undefined,
                new QueryDto(
                    email
                )
            ]
        }
        return [
            undefined,
            new QueryDto(
                "null",
                name
            )
        ]
    }
}