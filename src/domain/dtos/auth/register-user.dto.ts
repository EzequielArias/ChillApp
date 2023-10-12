import { Validators } from "../../../config";

export class RegisterUserDto {
    private constructor(
        public name : string,
        public email : string,
        public password : string,
        public img? : string
    ){}

    static create(object : {[key : string] : any}) : [string?, RegisterUserDto?] {
        
        const { name, email, password, img = 'men1' } = object;

        if(!name) return ["Missing name"]
        if(!email) return ["Missing email"]
        if(!Validators.email.test( email )) return ["Email is not valid"]
        if(!password) return ["Missing password"];
        if(password.length < 6) return ["Password to short"]

        return [
            undefined,
            new RegisterUserDto(
                name, email, password, img
            )
        ]
    }
}