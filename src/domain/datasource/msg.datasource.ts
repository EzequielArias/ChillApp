import { MessageEntity } from "../entities";
import { MessageDto } from "../dtos";

export abstract class MessageDatasource {
   
    abstract sendMsg( MessageDto : MessageDto  ) : Promise<MessageEntity>

}