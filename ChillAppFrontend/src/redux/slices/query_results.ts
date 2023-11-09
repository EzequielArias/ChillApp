import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IQueryUsers {
    id : string;
    img : string;
    email : string;
    name : string;
}

interface IState {
    results : IQueryUsers[]
}

const initialState : IState = {
    results : []
}

export const Query_results = createSlice({
    
    initialState : initialState,
    
    name : 'query_results',
    
    reducers : {
        getQueryUsers : ( state, action : PayloadAction<any> ) => {
            return {
                ...state,
                results : [...action.payload]
            }
        }
    }
})

export const { getQueryUsers } = Query_results.actions;