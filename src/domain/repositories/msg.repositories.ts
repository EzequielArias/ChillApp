import { MessageDto } from "../dtos";
import { MessageEntity } from "../entities";

export abstract class MessageRepository {
   
    abstract sendMsg( MessageDto : MessageDto ) : Promise<MessageEntity>

}