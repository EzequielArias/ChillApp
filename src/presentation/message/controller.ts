import { Response, Request } from "express";
import { CustomErr, Message, MessageDto, MessageRepository } from "../../domain";


export class MessageController {

    constructor(
        private readonly messageRepository : MessageRepository
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

    sendMsg = (req : Request, res : Response) => {
        const [error, messageDto ] = MessageDto.create( req.body );
        if( error ) return res.status(400).json({ error });

        new Message(this.messageRepository)
        .execute( messageDto! )
        .then(( data ) => res.json(data) )
        .catch( error => this.handleError( error, res ));
    }
}