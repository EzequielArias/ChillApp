import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageText {
    _id : string;
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


// Current open chat 

  export interface Message {
    user: string;
    text: string;
    _id: string;
    __v?: number; // Optional property
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

        getChats : ( state, action : PayloadAction<any> ) => {

            return {
               ...state,
               chat : action.payload
            }
        },

    }
})

export const { getChats } = ChatSlice.actions;