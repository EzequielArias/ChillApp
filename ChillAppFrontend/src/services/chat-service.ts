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

export const deleteMessage = ({ messageId, chatId, tk } : { messageId : string, chatId : string, tk : string} ) => {
    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${tk}`
    }

    return {
        call : axios.delete(`${url}/chat/${messageId}/${chatId}`, { headers }),
        controller
    }
}

export const getById = ( token : string, chatId : string ) => {

    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${token}`
    }

    return {
        call : axios.get(`${url}/chat/${chatId}`, { headers }),
        controller
    }
}

export const editMsg = ({ tk, messageId, chatId, body } : { tk : string, messageId : string, chatId : string, body : string } ) => {

    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${tk}`
    }

    return {
        call  : axios.put(`${url}/chat/${chatId}/${messageId}`, { data : body } , { headers }),
        controller
    }

}