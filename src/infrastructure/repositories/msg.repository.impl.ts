import { MessageDatasource, MessageDto, MessageEntity, MessageRepository } from "../../domain";

export class MessageRepositoryImpl implements MessageRepository {

    constructor(
        private readonly messageDatasource : MessageDatasource
    ){}

    sendMsg(MessageDto: MessageDto): Promise<MessageEntity> {
       return this.messageDatasource.sendMsg( MessageDto );
    }
    
}