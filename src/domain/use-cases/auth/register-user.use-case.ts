import { AuthRepository, CustomErr, RegisterUserDto } from "../..";
import { Jwt } from "../../../config";

type SignFunction = (payload: Object, duration?: string) => Promise<unknown>

interface UserToken {
    token : string;
    user : {
        id : string;
        name : string;
        email : string;
    };
}

interface RegisterUserUseCase {
    execute( registerUserDto : RegisterUserDto ) : Promise<UserToken>;
}  

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository : AuthRepository,
        private readonly signUser : SignFunction = Jwt.generateToken
    ){}

    async execute(registerUserDto: RegisterUserDto): Promise<any> {
        // Crear usuario,
        const user = await this.authRepository.register(registerUserDto);
        // Token
        const token = await this.signUser({ id : user.id}, '2h');
        if( !token ) throw CustomErr.internalServerError('Something went wrong');

        return {
            token : token,
            user : {
                id : user.id,
                name : user.name,
                email : user.email
            }
        }
    }
    
}