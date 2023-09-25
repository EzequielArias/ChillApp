import { AuthRepository, CustomErr, LoginUserDto } from "../..";
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

interface LoginUserCase {
    execute( loginUserDto : LoginUserDto ) : Promise<UserToken>;
}  

export class LoginUser implements LoginUserCase {

    constructor(
        private readonly authRepository : AuthRepository,
        private readonly signUser : SignFunction = Jwt.generateToken
    ){}

    async execute( loginUserDto : LoginUserDto ): Promise<any> {
        
        // Crear usuario,
        const user = await this.authRepository.login(loginUserDto);

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