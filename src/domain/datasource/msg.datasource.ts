import { ChatEntity, MessageEntity } from "../entities";
import { ChatsDto, MessageDto } from "../dtos";

export abstract class MessageDatasource {
   
    abstract sendMsg( MessageDto : MessageDto  ) : Promise<MessageEntity>

    abstract getChats( ChatsDto : ChatsDto ) : Promise<ChatEntity[]>
}