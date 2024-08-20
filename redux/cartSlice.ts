import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
    _id: string;
    price: number;
    name: string;
    quantity: number;
    image: string;
}

interface CartState {
    items: Item[];
    totalQuantity: number;
    changed: boolean;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    changed: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        replaceCart(state, action: PayloadAction<{ items: Item[]; totalQuantity: number }>) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action: PayloadAction<Omit<Item, 'quantity'>>) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item._id === newItem._id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                });
            } else {
                existingItem.quantity++;
            }
        },
        removeItemFromCart(state, action: PayloadAction<string>) {
            const _id = action.payload;
            const existingItem = state.items.find(item => item._id === _id);
            if (!existingItem) return;
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
              state.items = state.items.filter(item => item._id !== _id);
            } else {
              existingItem.quantity--;
            }
          },
          emptyCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.changed = true;
          }
    },
});

export const { replaceCart, addItemToCart, removeItemFromCart ,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;