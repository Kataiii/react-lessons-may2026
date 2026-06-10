import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "./selectors/authSelectors";
import { productApi } from "./services/productApi";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
