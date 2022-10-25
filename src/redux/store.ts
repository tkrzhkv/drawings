import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import painting from "./slices/paintingSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    painting,
  },
});

export type RootState = ReturnType<typeof store.getState>;
