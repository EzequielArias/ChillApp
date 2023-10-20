import { configureStore } from "@reduxjs/toolkit";
import { ChatSlice, RenderingSlice, UsersSlice } from "./slices";

export const store = configureStore({
    reducer : {
       user : UsersSlice.reducer,
       chat : ChatSlice.reducer,
       rendering : RenderingSlice.reducer
    }
})

export type StoreType = ReturnType<typeof store.getState>