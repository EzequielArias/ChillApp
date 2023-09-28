import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface User{
    image : string;
    email : string;
    nickname : string;
    isAuthenticated : boolean;
    isAdmin : boolean;
}

const UserState : User = {
    image : "",
    email : "",
    nickname : "",
    isAdmin : false,
    isAuthenticated : false
}

export const UsersSlice = createSlice({
    name : 'user',
    initialState : UserState,
    reducers : {

        login : ( state, action : PayloadAction<any> ) => {
            return {
                ...state,
                isAdmin : true,
                isAuthenticated : true
            }
        },

        logout : (state, action : PayloadAction<any>) => {
            return {
                ...state,
                isAuthenticated : false
            }
        }
    }
})

export const { login, logout } = UsersSlice.actions;