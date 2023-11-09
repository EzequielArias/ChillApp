import axios from 'axios';
import { LoadAbort } from '../utilities';

const url = "http://localhost:3100";

export const GetChats = ( token : string ) => {

    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${token}`
    }

    return {
        call : axios.get(`${url}/chat/get-chats`, { headers }),
        controller
    }
}

export const newChat = ( token : string, object : { userId1 : string, userId2 : string} ) => {
    
    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${token}`
    }

    return {
        call : axios.post(`${url}/chat`, object ,{ headers }),
        controller
    }
}