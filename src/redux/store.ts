import i18nReducer, { setCulture } from "./i18nReducer"
import { configureStore } from "@reduxjs/toolkit";
import { i18nSlice } from "./i18nSlice";

const store = configureStore({
    reducer: {
        i18n: i18nSlice.reducer //命名空间 i18n
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store
