import { ChatEntity, MessageEntity, DeleteMessageEntity } from "../entities";
import { ChatsDto, MessageDto, NewChatDto, DeleteMessageDto, GetChatByIdDto, EditMsgDto } from "../dtos";

export abstract class MessageDatasource {
   
    abstract sendMsg( MessageDto : MessageDto  ) : Promise<MessageEntity>

    abstract getChats( ChatsDto : ChatsDto ) : Promise<ChatEntity[]>

    abstract newChat( NewChatDto : NewChatDto ) : Promise<ChatEntity>

    abstract deleteMsg ( MessageDto : DeleteMessageDto ) : Promise<DeleteMessageEntity>

    abstract getByIdChat ( GetChatByIdDto : GetChatByIdDto) : Promise<ChatEntity>

    abstract editMsg ( EditMsg : EditMsgDto ) : Promise<MessageEntity>
}