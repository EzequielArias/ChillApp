import { Request, Response } from "express"
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos/auth/"
import { AuthRepository, CustomErr, LoginUser, RegisterUser } from "../../domain/";
import { UserModel } from "../../databases/mongodb";
import { Logger } from "../utils/Logger";

export class AuthController {

    constructor(
        private readonly authRepository : AuthRepository
    ){}

    registerUser = (req : Request, res : Response) => {
        const [error, registerUserDto ] = RegisterUserDto.create( req.body );

        new RegisterUser(this.authRepository)
        .execute( registerUserDto! )
        .then(( data ) => {
            if(error) throw error;
            res.json(data)
        })
        .catch( (error) => {
            Logger.error(error)
            CustomErr.handleError(error, res)
        });
    } 

    loginUser = (req : Request, res : Response) => {
        const [ error, loginUserDto ] = LoginUserDto.create( req.body );

        new LoginUser(this.authRepository)
            .execute( loginUserDto! )
            .then((data) => {
                if(error) throw error;
                res.json( data )
            })
            .catch( error => {
                Logger.error(error)
                CustomErr.handleError(error, res)
            });
    }

    getUsers = (req : Request , res : Response) => {
        UserModel.find()
            .then( users => res.json({
                users,
                user : req.body.user
            }))
            .catch(error => {
                Logger.error(error)
                CustomErr.handleError(error, res)
            });
    }
}