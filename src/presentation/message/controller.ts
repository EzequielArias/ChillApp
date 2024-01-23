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
import { Logger } from "../utils/Logger";

export class MessageController {

    constructor(
        private readonly messageRepository : MessageRepository
    ){}

    sendMsg = ( socketData : any) => {

        const [ error, messageDto ] = MessageDto.create( socketData );

        return new Promise(( resolve, reject ) => {
            new Message( this.messageRepository )
            .execute( messageDto! )
            .then(( data ) => {
                if(error) throw error;
                resolve(JSON.stringify(data))
            })
            .catch( (error) => {
                Logger.error(error)
                reject(JSON.stringify({ error : error.message}))
            })
        })
    }

    getChats = ( req : Request, res : Response ) => {
        const [ error, chatsDto ] = ChatsDto.create( req.body );

        new Chat( this.messageRepository )
        .execute( chatsDto! )
        .then(( data ) => {
            if(error) throw error;
            res.json( data ) 
        })
        .catch( error => {
            Logger.error(error);
            CustomErr.handleError(error, res);
        });
    }

    newChat = ( req : Request, res : Response ) => {
        const [ error, newChatDto ] = NewChatDto.create( req.body );

        new NewChat( this.messageRepository )
        .execute( newChatDto! )
        .then(( data ) => {
            if(error) throw error;
            res.json( data )
        })
        .catch((error) => {
            Logger.error(error);
            CustomErr.handleError(error, res);
        });
    }

    deleteMsg = ( req : Request, res : Response ) => {
        const [ error, deleteMessageDto ] = DeleteMessageDto.create({ id : req.params.messageId, chatId : req.params.chatId });
       
        return new Message( this.messageRepository )
               .remove( deleteMessageDto!)
               .then(( data ) => {
                if(error) throw error;
                res.json( data )
                })
                .catch((error) => {
                    Logger.error(error);
                    CustomErr.handleError(error, res);
                });
    }

    chatById = ( req : Request, res : Response ) => {

        const [ error , getChatById ] = GetChatByIdDto.create( { id : req.params.chatId } );

        return new Message( this.messageRepository )
            .getChatById( getChatById! )
            .then(( data ) => {
                if(error) throw error;
                res.json( data )
            })
            .catch((error) => {
                Logger.error(error);
                CustomErr.handleError(error, res);
            });
    }

    editMsg = ( req : Request, res : Response ) => {
        
        const [ error, editMsgDto ] = EditMsgDto.create({ chatId : req.params.chatId, messageId : req.params.messageId, data : req.body.data })
      
        return new Message( this.messageRepository )
            .editMsg( editMsgDto! )
            .then(( data ) => {
                if(error) throw error;
                res.json( data )
            })
            .catch((error) => {
                Logger.error(error);
                CustomErr.handleError(error, res);
            });
    }
}
