import { ChatEntity, ChatsDto, MessageDatasource, MessageDto, MessageEntity, MessageRepository, NewChatDto } from "../../domain";

export class MessageRepositoryImpl implements MessageRepository {

    constructor(
        private readonly messageDatasource : MessageDatasource
    ){}

    newChat(NewChatDto: NewChatDto): Promise<ChatEntity> {
        return this.messageDatasource.newChat( NewChatDto );
    }
    
    getChats(ChatsDto: ChatsDto): Promise<ChatEntity[]> {
        return this.messageDatasource.getChats( ChatsDto );
    }

    sendMsg(MessageDto: MessageDto): Promise<MessageEntity> {
       return this.messageDatasource.sendMsg( MessageDto );
    }
    
}