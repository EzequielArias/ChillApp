import { Response, Request } from "express";
import { ChatsDto, 
        CustomErr, 
        Message, 
        MessageDto, 
        MessageRepository,
        Chat,
        NewChatDto,
        NewChat,
        DeleteMessageDto,
        GetChatByIdDto,
        EditMsgDto
    } from "../../domain";


export class MessageController {

    constructor(
        private readonly messageRepository : MessageRepository
    ){}

    private handleError = (error : unknown, res : Response) => {
        console.log(error)
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
            .then(( data ) => {
                console.log(data)
                resolve(JSON.stringify(data))
            })
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

    deleteMsg = ( req : Request, res : Response ) => {
        const [ error, deleteMessageDto ] = DeleteMessageDto.create({ id : req.params.messageId, chatId : req.params.chatId });
       
        if(error) return JSON.stringify({ error });

        return new Message( this.messageRepository )
               .remove( deleteMessageDto!)
               .then(data => res.json(data)) 
               .catch(error => this.handleError( error, res ))
    }

    chatById = ( req : Request, res : Response ) => {

        const [ error , getChatById ] = GetChatByIdDto.create( { id : req.params.chatId } );

        if(error) return res.json({ error });

        return new Message( this.messageRepository )
            .getChatById( getChatById! )
            .then(data => res.json(data))
            .catch(error => this.handleError( error, res ));
    }

    editMsg = ( req : Request, res : Response ) => {
        
        const [ error, editMsgDto ] = EditMsgDto.create({ chatId : req.params.chatId, messageId : req.params.messageId, data : req.body.data })
        console.log(editMsgDto)
        console.log(error)
        if(error) return res.json({ error });

        return new Message( this.messageRepository )
            .editMsg( editMsgDto! )
            .then( data => {
                console.log(data)
                res.json(data)
            })
            .catch(error => this.handleError( error, res));
    }
}
