import { MessageDto } from "../../dtos";
import { MessageRepository } from "../../repositories";


interface MessageUserCase {
    execute( MessageDto : MessageDto ) : Promise<any>
}

export class Message implements MessageUserCase {
    
    constructor(
        private readonly MsgRespository : MessageRepository
    ){}

    async execute( MessageDto : MessageDto ) : Promise<any> {

        
        const msg = await this.MsgRespository.sendMsg( MessageDto );

        return {
            message : {
                owners : [msg.senderId, msg.receiverId],
                text : msg.text,
                date : new Date()        
            }
        }
    }
}