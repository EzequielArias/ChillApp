import { ChatsDto, DeleteMessageDto, MessageDto, NewChatDto, GetChatByIdDto, EditMsgDto } from "../dtos";
import { ChatEntity, DeleteMessageEntity, MessageEntity } from "../entities";

export abstract class MessageRepository {
   
    abstract sendMsg( MessageDto : MessageDto ) : Promise<MessageEntity>

    abstract getChats( ChatsDto : ChatsDto ) : Promise<ChatEntity[]>

    abstract newChat( NewChatDto : NewChatDto) : Promise<ChatEntity>

    abstract deleteMsg ( MessageDto : DeleteMessageDto ) : Promise<DeleteMessageEntity>

    abstract getByIdChat ( GetChatByIdDto : GetChatByIdDto) : Promise<ChatEntity>
 
    abstract editMsg ( EditMsg : EditMsgDto ) : Promise<MessageEntity>
}