import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./slices";

export const store = configureStore({
    reducer : {
       user : UsersSlice.reducer
    }
})

export type StoreType = ReturnType<typeof store.getState>