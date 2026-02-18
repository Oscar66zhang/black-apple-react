// actions
// API 请求有三个经典状态：请求开始，请求成功，或者请求失败
// 对应在action上，可以写为
// - **FETCH_START** → 开始请求，loading = true
// - **FETCH_SUCCESS** → 请求成功，data 回来了
// - **FETCH_ERROR** → 请求失败，报错信息拿到


import { Dispatch } from "react";

const fetchStart = () => ({
    type: "FETCH_START" as const
})

const fetchSuccess = <T>(data: T) => ({
    type: "FETCH_SUCCESS" as const,
    payload: data
})

const fetchError = (error: string) => ({
    type: "FETCH_ERROR" as const,
    payload: error
})

type ApiAction<T> =
    | ReturnType<typeof fetchStart>
    | ReturnType<typeof fetchSuccess<T>>
    | ReturnType<typeof fetchError>

export const useApiActions = <T>(dispatch: Dispatch<ApiAction<T>>) => ({
    fetchStart: () => dispatch(fetchStart()),
    fetchSuccess: (data: T) => dispatch(fetchSuccess(data)),
    fetchError: (error: string) => dispatch(fetchError(error)),
})

//reducer
type ApiState<T> = {
    loading: boolean,
    data: T | null,
    error: string | null,
}

//reducer
const apiReducer = <T>(state: ApiState<T> | null, action: ApiAction<T>) => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, data: null, error: null }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, data: action.payload, error: null }
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload, data: null }
        default:
            return state;
    }
}

export default apiReducer