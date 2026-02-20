import { Dispatch } from "react";
import {
    CartAction,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    syncCart,
} from "@/reducers/shoppingCartReducer";
import { CartItem } from "@/types/custom";
import useApiData from "./useApiData";

const useShoppingCartAction = (dispatch: Dispatch<CartAction>) => {
    const { data, fetchData: callApi } = useApiData(
        "http://152.136.182.210:12231/api/ShoppingCart/items",
        {
            autoFetch: false,
        }
    );

    const jwt = localStorage.getItem("token");

    return {
        addToCart: async (item: CartItem) => {
            try {
                await callApi({
                    overrideMethod: "POST",
                    overrideHeaders: {
                        "Authorization": `Bearer ${jwt}`,
                    },
                    overrideBody: item,
                });
                dispatch(addItem(item));
            } catch (error) {
                console.error("添加到购物车失败:", error);
            }
        },
        removeFromCart: async (index: number) => {
            try {
                await callApi({
                    overrideMethod: "DELETE",
                    overrideHeaders: {
                        "Authorization": `Bearer ${jwt}`,
                    },
                });
                dispatch(removeItem(index));
            } catch (error) {
                console.error("从购物车移除失败:", error);
            }
        },
        updateItem: async (index: number, newItem: CartItem) => {
            try {
                await callApi({
                    overrideMethod: "PUT",
                    overrideHeaders: {
                        "Authorization": `Bearer ${jwt}`,
                    },
                    overrideBody: newItem,
                });
                dispatch(updateItem(index, newItem));
            } catch (error) {
                console.error("更新购物车项失败:", error);
            }
        },
        clearCart: async () => {
            try {
                await callApi({
                    overrideMethod: "DELETE",
                    overrideHeaders: {
                        "Authorization": `Bearer ${jwt}`,
                    },
                });
                dispatch(clearCart());
            } catch (error) {
                console.error("清空购物车失败:", error);
            }
        },
        syncCart: (items: CartItem[]) => dispatch(syncCart(items)),
    }
}

export default useShoppingCartAction;