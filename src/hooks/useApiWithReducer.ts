import apiReducer, { useApiActions } from "@/reducers/apiReducer"
import { useEffect, useReducer } from "react"

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const useApiWithReducer = <T>(url: string) => {
    const [state, dispatch] = useReducer(apiReducer<T>, initialState);
    const { fetchStart, fetchSuccess, fetchError } = useApiActions<T>(dispatch);
    const fetchData = async (signal: AbortSignal) => {
        try {
            fetchStart();
            const response = await fetch(url, { signal });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data: T = await response.json();
            fetchSuccess(data);
        } catch (error) {
            if (error instanceof Error) {
                fetchError(error.message);
            } else {
                fetchError("An unknown error occurred");
            }
        }
    };
    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal);
        return () => {
            controller.abort();
        }
    }, [url]);
    return {
        ...state,
        refetch: () => fetchData(new AbortController().signal),
    } as const;
}

export default useApiWithReducer