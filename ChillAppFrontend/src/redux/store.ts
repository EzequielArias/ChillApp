import { configureStore } from "@reduxjs/toolkit";
import { ChatSlice, UsersSlice } from "./slices";

export const store = configureStore({
    reducer : {
       user : UsersSlice.reducer,
       chat : ChatSlice.reducer
    }
})

export type StoreType = ReturnType<typeof store.getState>