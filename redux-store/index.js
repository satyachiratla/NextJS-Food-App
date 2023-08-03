import { configureStore } from "@reduxjs/toolkit";
import CartReducder from "./cart-slice";

const store = configureStore({
    reducer: { cart: CartReducder }
});

export default store;