import { ChatsDto } from "../../dtos";
import { MessageRepository } from "../../repositories"

interface ChatUseCase {
    execute( ChatsDto : ChatsDto ) : Promise<any>
}

export class Chat implements ChatUseCase {

    constructor(
        private readonly MsgRespository : MessageRepository
    ){}

    async execute( ChatsDto : ChatsDto ): Promise<any> {
        const chats = await this.MsgRespository.getChats( ChatsDto );

        return {
            chats 
        }
    }

}