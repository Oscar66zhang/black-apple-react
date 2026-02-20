import i18nReducer, { setCulture } from "./i18nReducer"
import { configureStore } from "@reduxjs/toolkit";
import { i18nSlice } from "./i18nSlice";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        i18n: i18nSlice.reducer, //命名空间 i18n state.i18n.currentLanguage
        search: searchReducer, //命名空间 search state.search
        user: userReducer, //命名空间 user state.user
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispach = typeof store.dispatch;
export default store
