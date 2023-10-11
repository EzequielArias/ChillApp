import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface MessageText {
    from : string;
    date : string;
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
   chat : ChatSlot[]
}

const UserState : Chat = {
    chat : []
}

export const ChatSlice  = createSlice({
    name : 'chat',
    initialState : UserState,
    reducers : {
        getMessages : (state, action : PayloadAction<any> ) => {
            // Buscar el chat por index y como ya tenemos o deberiamos tener la data extraida del backend ir agregando a cada array de messages
            const chatIndex = state.chat.findIndex((el) => {
                el.chatId === action.payload.chatId
            }),
            selectedChat = state.chat[chatIndex],
            modifiedChat = selectedChat.userChat.messages = action.payload.messages

            const returnChat = [...state.chat][chatIndex] = modifiedChat;

            return {
                ...state,
                chat : returnChat
            }
        },

        getChats : ( state, action : PayloadAction<any> ) => {
            return {
                ...state
            }
        }
    }
})

export const { getMessages } = ChatSlice.actions;