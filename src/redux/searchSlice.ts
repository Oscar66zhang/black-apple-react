import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types/custom";
import { createSlice } from "@reduxjs/toolkit";

export const fetchSearchResults = createAsyncThunk<Product[], { keyword: string }
>("search", async ({ keyword }: { keyword: string }, { signal }) => {
    const controller = new AbortController();
    signal.addEventListener("abort", () => {
        controller.abort();
    });
    const response = await fetch(`http://152.136.182.210:12231/api/products?keyword=${encodeURIComponent(keyword)}`, {
        signal: controller.signal
    })
    if (response.status == 404) {
        throw new Error("没有找到商品");
    }
    if (!response.ok) {
        throw new Error(`Error fetching products with keyword ${keyword}: ${response.statusText}`);
    }
    const data: Product[] = await response.json();
    return data;
})

interface SearchState {
    items: Product[],
    isLoading: boolean,
    error: string | null,
}

const initialState: SearchState = {
    items: [],
    isLoading: false,
    error: null,
}


export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSearchResults.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
            state.error = null;
        }).addCase(fetchSearchResults.rejected, (state, action) => {
            if (action.error.message === "Aborted") {
                console.log("请求已取消");
                state.error = "请求已取消";
            } else {
                state.error = action.error.message || "Unknown error";
            }
            state.isLoading = false;
            state.items = [];
        })
    }
})


export default searchSlice.reducer;
