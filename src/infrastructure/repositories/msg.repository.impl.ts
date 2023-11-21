import { ChatEntity, ChatsDto, DeleteMessageDto, DeleteMessageEntity, EditMsgDto, GetChatByIdDto, MessageDatasource, MessageDto, MessageEntity, MessageRepository, NewChatDto } from "../../domain";

export class MessageRepositoryImpl implements MessageRepository {

    constructor(
        private readonly messageDatasource : MessageDatasource
    ){}
    
    editMsg(EditMsg: EditMsgDto): Promise<MessageEntity> {
        return this.messageDatasource.editMsg( EditMsg );
    }

    newChat(NewChatDto: NewChatDto): Promise<ChatEntity> {
        return this.messageDatasource.newChat( NewChatDto );
    }
    
    getChats(ChatsDto: ChatsDto): Promise<ChatEntity[]> {
        return this.messageDatasource.getChats( ChatsDto );
    }

    sendMsg(MessageDto: MessageDto): Promise<MessageEntity> {
       return this.messageDatasource.sendMsg( MessageDto );
    }
    
    deleteMsg(DeleteMessageDto: DeleteMessageDto): Promise<DeleteMessageEntity> {
        return this.messageDatasource.deleteMsg( DeleteMessageDto );
    }

    getByIdChat(GetChatByIdDto: GetChatByIdDto): Promise<ChatEntity> {
        return this.messageDatasource.getByIdChat( GetChatByIdDto );
    }
}