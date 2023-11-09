import { NewChatDto } from "../../dtos";
import { ChatEntity } from "../../entities";
import { MessageRepository } from "../../repositories";


interface NewChatUseCase {
    execute( NewChatDto : NewChatDto ) : Promise<ChatEntity> 
}

export class NewChat implements NewChatUseCase {

    constructor(
        private readonly MsgRespository : MessageRepository
    ){}

    async execute(NewChatDto: NewChatDto): Promise<ChatEntity> {
        
        const newChat = await this.MsgRespository.newChat( NewChatDto );
        

        return {
            _id : newChat._id,
            owners : newChat.owners,
            messages : newChat.messages
        }
    }
    
}