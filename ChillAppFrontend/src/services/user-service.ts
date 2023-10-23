import axios from 'axios';
import { LoadAbort } from '../utilities';

const url = "http://localhost:3100";

const config = {
  headers: {
    'Content-Type': 'application/json'
  },
};

export const LogIn = ( data : string ) => {

        const controller = LoadAbort( );

        return {
        call : axios.post(`${url}/auth/login`,  data  , config ),
        controller
        }
}

interface RegisterPayload {
    name : string;
    email : string;
    password : string;
    img : string;
}

export const Register = ( payload :  RegisterPayload ) => {

    const controller = LoadAbort();

    return {
        call : axios.post(`${url}/auth/register`, payload ),
        controller
    }
}

export const GetUser = ( token : string) => {
  const controller = LoadAbort();

  const headers = {
    Authorization : `Bearer ${token}`
  }

  return {
    call : axios.get(`${url}/auth`, { headers } ),
    controller
  }
}