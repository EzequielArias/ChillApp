import { ChatsDto, MessageDto, NewChatDto } from "../dtos";
import { ChatEntity, MessageEntity } from "../entities";

export abstract class MessageRepository {
   
    abstract sendMsg( MessageDto : MessageDto ) : Promise<MessageEntity>

    abstract getChats( ChatsDto : ChatsDto ) : Promise<ChatEntity[]>

    abstract newChat( NewChatDto : NewChatDto) : Promise<ChatEntity>
}