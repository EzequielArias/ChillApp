import { AuthDataSource, UserEntity, AuthRepository } from "../../domain";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos/auth/";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource : AuthDataSource
    ){}

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }
    
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
       return this.authDatasource.login(loginUserDto);
    }
}