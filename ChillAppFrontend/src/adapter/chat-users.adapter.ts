
interface ChatRes {
    _id: string;
    owners: {
      owner1: {
        _id: string;
        name: string;
        email: string;
        img : string;
      };
      owner2: {
        _id: string;
        name: string;
        email: string;
        img : string;
      };
    };
    messages: Message[];
  }
  
  interface Message {
    user: string;
    text: string;
  }

  interface GetChatsResponse {
    chats : ChatRes[]
  }
  
export const ChatUserAdapter = ( data : GetChatsResponse, sessionUserId : string) => {

  const cleanedData = data.chats.map((el) => {
        
        if(el.owners.owner1._id === sessionUserId){
            return {
                chatId : el._id,
                userChat : {
                    id : el.owners.owner2._id,
                    name : el.owners.owner2.email,
                    email : el.owners.owner2.name,
                    messages : el.messages,
                    img : el.owners.owner2.img
                }
            }
        }

        if( el.owners.owner2._id === sessionUserId ){
            return {
                chatId : el._id,
                userChat : {
                    id : el.owners.owner1._id,
                    name : el.owners.owner1.name,
                    email : el.owners.owner1.email,
                    messages : el.messages,
                    img : el.owners.owner1.img
                }
            }
        }
    })
    return cleanedData;
}