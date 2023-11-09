import { Response, Request } from "express";
import { ChatsDto, 
        CustomErr, 
        Message, 
        MessageDto, 
        MessageRepository,
        Chat,
        NewChatDto,
        NewChat
    } from "../../domain";


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

    sendMsg = ( socketData : any) => {

        const [ error, messageDto ] = MessageDto.create( socketData );
        if( error ) return JSON.stringify({ error });

        return new Promise(( resolve, reject ) => {
            new Message( this.messageRepository )
            .execute( messageDto! )
            .then(( data ) => resolve(JSON.stringify(data)))
            .catch( error => reject(JSON.stringify({ error : error.message})) )
        })
    }

    getChats = ( req : Request, res : Response ) => {
        const [ error, chatsDto ] = ChatsDto.create( req.body );

        if( error ) return res.status(400).json({ error });

        new Chat( this.messageRepository )
        .execute( chatsDto! )
        .then(( data ) => res.json( data ) )
        .catch( error => this.handleError( error, res ));
    }

    newChat = ( req : Request, res : Response ) => {
        const [ error, newChatDto ] = NewChatDto.create( req.body );

        if( error ) return res.status(400).json({ error });

        new NewChat( this.messageRepository )
        .execute( newChatDto! )
        .then(( data ) => res.json( data ))
        .catch(error => this.handleError(error, res));
    }
}