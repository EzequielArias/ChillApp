import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface MessageText {
    user : string;
    text : string;
}

interface ChatSlot {
    chatId : string;
    userChat : {
        id : string;    // si el id es igual al from del mensaje significa que el mensaje no es nuestro sino de la persona con la que estamos chateando
        name : string; 
        email : string;
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
            
            const selectedChatMessages = state.chat.find( el => el.chatId === action.payload.chatId )
            
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
        }
    }
})

export const { getMessages, getChats } = ChatSlice.actions;