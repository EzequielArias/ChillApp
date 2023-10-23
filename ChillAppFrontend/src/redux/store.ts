import { configureStore } from "@reduxjs/toolkit";
import { ChatSlice, Query_results, RenderingSlice, UsersSlice } from "./slices";

export const store = configureStore({
    reducer : {
       user : UsersSlice.reducer,
       chat : ChatSlice.reducer,
       rendering : RenderingSlice.reducer,
       query_results : Query_results.reducer
    }
})

export type StoreType = ReturnType<typeof store.getState>