import { ChatEntity, MessageEntity } from "../entities";
import { ChatsDto, MessageDto, NewChatDto } from "../dtos";

export abstract class MessageDatasource {
   
    abstract sendMsg( MessageDto : MessageDto  ) : Promise<MessageEntity>

    abstract getChats( ChatsDto : ChatsDto ) : Promise<ChatEntity[]>

    abstract newChat( NewChatDto : NewChatDto ) : Promise<ChatEntity>
}