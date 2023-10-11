import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../adapter";

interface User {
    image : string;
    email : string;
    name : string;
    isAuthenticated : boolean;
    isAdmin : boolean;
}

const UserState : User = {
    image : "",
    email : "",
    name : "",
    isAdmin : false,
    isAuthenticated : false
}

export const UsersSlice = createSlice({
    name : 'user',
    initialState : UserState,
    reducers : {

        login : ( state, action : PayloadAction<AuthResponse> ) => {
            return {
                ...state,
                isAdmin : true,
                isAuthenticated : true,
                name : action.payload.user.name,
                email : action.payload.user.email
            }
        },

        logout : ( state ) => {
            return {
                ...state,
                isAuthenticated : false,
                isAdmin : false
            }
        }
    }
})

export const { login, logout } = UsersSlice.actions;