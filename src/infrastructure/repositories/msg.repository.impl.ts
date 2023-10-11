import { ChatEntity, ChatsDto, MessageDatasource, MessageDto, MessageEntity, MessageRepository } from "../../domain";

export class MessageRepositoryImpl implements MessageRepository {

    constructor(
        private readonly messageDatasource : MessageDatasource
    ){}
    
    getChats(ChatsDto: ChatsDto): Promise<ChatEntity[]> {
        return this.messageDatasource.getChats( ChatsDto );
    }

    sendMsg(MessageDto: MessageDto): Promise<MessageEntity> {
       return this.messageDatasource.sendMsg( MessageDto );
    }
    
}