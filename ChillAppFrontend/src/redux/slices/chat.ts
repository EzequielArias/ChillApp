import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

const socket = io("http://localhost:5555");


interface MessageText {
    from : string;
    date : string;
    text : string;
}

interface Chat {
   socket : Socket<ManagerOptions, SocketOptions>;
   messages : MessageText[]
}

const UserState : Chat = {
    socket : socket ,
    messages : []
}

export const ChatSlice  = createSlice({
    name : 'chat',
    initialState : UserState,
    reducers : {
        getMessages : (state, action : PayloadAction<any> ) => {
            return {
                ...state,
                messages : [ ...state.messages, action.payload ]
            }
        }
    }
})

export const { getMessages } = ChatSlice.actions;