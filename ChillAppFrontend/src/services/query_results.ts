import axios from 'axios';
import { LoadAbort } from '../utilities';

const url = "http://localhost:3100";

export const GetUsersByQuery = ( query : string, token : string ) => {
    
    const controller = LoadAbort();
    const headers = {
        Authorization : `Bearer ${token}`
    };

    return {
        call : axios.get(`${url}/search-bar/person${query}`, { headers }),
        controller
    };
}