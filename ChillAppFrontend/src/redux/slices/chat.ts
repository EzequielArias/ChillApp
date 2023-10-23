import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageText {
    user : string;
    text : string;
}

interface ChatSlot {
    chatId : string;
    userChat : {
        id : string;    // si el id es igual al from del mensaje significa que el mensaje no es nuestro sino de la persona con la que estamos chateando
        name : string; 
        email : string;
        img : string;
        messages : MessageText[]
   } 
} 

interface Chat {
   chat : ChatSlot[],
   currentOpenChat : MessageText[]
}

const UserState : Chat = {
    chat : [],
    currentOpenChat : []
}

export const ChatSlice  = createSlice({
    name : 'chat',
    initialState : UserState,
    reducers : {

        getMessages : ( state, action : PayloadAction<any> ) => {
            const selectedChatMessages = state.chat.find( el => el.chatId === action.payload )
            
            if(!selectedChatMessages) return {
                ...state
            }

            return {
                ...state,
                currentOpenChat : selectedChatMessages.userChat.messages
            }
        },

        getChats : ( state, action : PayloadAction<any> ) => {
            return {
               ...state,
               chat : action.payload
            }
        },

        addMessageToChat: (state, action: PayloadAction<{ chatId: string; message: MessageText }>) => {
           
            const { chatId, message } = action.payload;
            const chatIndex = state.chat.findIndex((el) => el.chatId === chatId);
          
            if (chatIndex === -1) {
              // Chat not found, you might want to handle this case
              return state;
            }
          
            // Create a copy of the selected chat and add the new message
            const updatedChat = { ...state.chat[chatIndex] };
            updatedChat.userChat.messages.unshift(message);
          
            // Create a copy of the state with the updated chat
            const updatedChats = [...state.chat];
            updatedChats[chatIndex] = updatedChat;
          
            return {
              ...state,
              chat: [...updatedChats],
            };
        }
    }
})

export const { getMessages, getChats, addMessageToChat } = ChatSlice.actions;