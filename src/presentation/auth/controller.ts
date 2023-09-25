import { Request, Response } from "express"
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos/auth/"
import { AuthRepository, CustomErr, LoginUser, RegisterUser } from "../../domain/";
import { UserModel } from "../../databases/mongodb";

export class AuthController {

    constructor(
        private readonly authRepository : AuthRepository
    ){}

    private handleError = (error : unknown, res : Response) => {
        if(error instanceof CustomErr)
        {
            return res.status(error.statusCode).json({ error : error.message });
        }
        /**
            Hay que agregar un user logger como winston.
            Para tener una base de datos con registros de errores
         */
        console.log(error)
        return res.status(500).json({ error : 'Internal Server Error'});
    }

    registerUser = (req : Request, res : Response) => {
        const [error, registerUserDto ] = RegisterUserDto.create( req.body );
        if( error ) return res.status(400).json({ error });

        new RegisterUser(this.authRepository)
        .execute( registerUserDto! )
        .then(( data ) => res.json(data) )
        .catch( error => this.handleError( error, res ));
    } 

    loginUser = (req : Request, res : Response) => {
        const [ error, loginUserDto ] = LoginUserDto.create( req.body );
        if( error ) return res.status(400).json({ error });

        new LoginUser(this.authRepository)
            .execute( loginUserDto! )
            .then((data) => res.json( data ))
            .catch( error => this.handleError( error, res));
    }

    getUsers = (req : Request , res : Response) => {
        UserModel.find()
            .then( users => res.json({
                users,
                user : req.body.payload
            }))
            .catch(err => res.status(500).json({error : "internal server error"}));
    }
}