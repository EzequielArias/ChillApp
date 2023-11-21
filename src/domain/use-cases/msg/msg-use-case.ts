import { DeleteMessageDto, MessageDto, GetChatByIdDto, EditMsgDto } from "../../dtos";
import { ChatEntity, DeleteMessageEntity, MessageEntity } from "../../entities";
import { MessageRepository } from "../../repositories";


interface MessageUserCase {
    execute( MessageDto : MessageDto ) : Promise<any>
    remove ( DeleteMessageDto : DeleteMessageDto ) : Promise<DeleteMessageEntity>
    getChatById ( GetChatByIdDto : GetChatByIdDto ) : Promise<any>
}

export class Message implements MessageUserCase {
    
    constructor(
        private readonly MsgRespository : MessageRepository
    ){}

    async execute( MessageDto : MessageDto ) : Promise<any> {

        const msg = await this.MsgRespository.sendMsg( MessageDto );

        return {
            message : {
                id : msg.id,
                owners : [msg.senderId, msg.receiverId],
                text : msg.text,
                date : new Date()        
            }
        }
    }

    async remove(DeleteMessageDto: DeleteMessageDto): Promise<DeleteMessageEntity> {
       const repository = await this.MsgRespository.deleteMsg( DeleteMessageDto );

       return repository;
    }

    async getChatById( GetChatByIdDto: GetChatByIdDto ): Promise<ChatEntity> {

        const chat = await this.MsgRespository.getByIdChat( GetChatByIdDto );

        return chat;
    }

    async editMsg( EditMsgDto : EditMsgDto) : Promise<MessageEntity> {
        
        const edited = await this.MsgRespository.editMsg( EditMsgDto );
        return edited;
    }
}
