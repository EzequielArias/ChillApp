import { BcryptAdapter } from "../../config";
import { UserModel } from "../../databases/mongodb";
import { AuthDataSource, CustomErr, UserEntity } from "../../domain";
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos/auth";
import { UserMapper } from "../mappers";

type HashFunction = ( password : string) => string;
type CompareFunction = ( password : string, hash : string ) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {

    constructor(
        private readonly hashPassword : HashFunction = BcryptAdapter.hash,
        private readonly comparePassword : CompareFunction = BcryptAdapter.compare
    ){}
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {
            
            const exists = await UserModel.findOne({ email });

            if(exists) throw CustomErr.badRequest('Credentials invalid');

            const user = await UserModel.create({
                name : name,
                email : email,
                password : this.hashPassword(password)
            })

            await user.save()
            //TODO falta un mapper
            return UserMapper.userEntityFromObject( user );
            
        } catch (error) {
            
            if(error instanceof CustomErr){
                throw error;
            }

            throw CustomErr.internalServerError();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email, password } = loginUserDto;

       try {
        const user = await UserModel.findOne({ email });

        if( !user ) throw CustomErr.notFound("Password or Email are invalid");
        
        const compare = this.comparePassword( password, user.password );

        if( !compare ) throw CustomErr.unAuthorized("Password or Email are invalid");


        return UserMapper.userEntityFromObject( user );

       } catch (error) {

        if(error instanceof CustomErr){
                throw error;
            }
        throw CustomErr.internalServerError();

       }

    }
}