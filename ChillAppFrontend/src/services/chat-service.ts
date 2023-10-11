import axios from 'axios';
import { LoadAbort } from '../utilities';

const url = "http://localhost:3100";

export const GetChats = ( token : string ) => {

    const controller = LoadAbort();

    return {
        call : axios.post(`${url}/messages`),
        controller
    }
}
