import { Dispatch } from "react";
import {
    CartAction,
    addItem,
    removeItem,
    updateItem,
    clearCart,
} from "@/reducers/shoppingCartReducer";
import { CartItem } from "@/types/custom";

const useShoppingCartAction = (dispatch: Dispatch<CartAction>) => {
    return {
        addToCart: (item: CartItem) => dispatch(addItem(item)),
        removeFromCart: (index: number) => dispatch(removeItem(index)),
        updateItem: (index: number, newItem: CartItem) => dispatch(updateItem(index, newItem)),
        clearCart: () => dispatch(clearCart()),
    }
}

export default useShoppingCartAction;