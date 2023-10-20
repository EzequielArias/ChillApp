import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const Rendering = {
    isLoaded : false
}

export const RenderingSlice  = createSlice({
    name : 'rendering',
    initialState : Rendering,
    reducers : {
        loaded : (state) => {
            return {
                ...state,
                isLoaded : true
            }
        }
    }
})

export const { loaded } = RenderingSlice.actions;