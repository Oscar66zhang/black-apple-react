import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CultureCode } from "./i18nReducer";

export interface I18nState {
    currentLanguage: CultureCode;
}

const initialState: I18nState = {
    currentLanguage: "zh-CN"
}


export const i18nSlice = createSlice({
    name: "i18n",
    initialState,
    reducers: {
        setCulture: (state, action: PayloadAction<CultureCode>) => {
            state.currentLanguage = action.payload;
        }
    }
})

export const { setCulture } = i18nSlice.actions;
export default i18nSlice.reducer;