import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IQueryUsers {
    id : string;
    image : string;
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