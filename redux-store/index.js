import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/authApi";
import { foodItemsApi } from "./apis/foodItemsApi";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";
import { fileUploadApi } from "./apis/uploadFileApi";
import { addressApi } from "./apis/addressApi";
import { ordersApi } from "./apis/ordersApi";

const combineApiReducersAndMiddleware = (apiModules) => {
  const reducers = {};
  const middleware = [];

  Object.keys(apiModules).forEach((moduleName) => {
    const api = apiModules[moduleName];
    reducers[api.reducerPath] = api.reducer;
    middleware.push(api.middleware);
  });

  return { reducers, middleware };
};

const { reducers, middleware } = combineApiReducersAndMiddleware({
  authApi,
  foodItemsApi,
  fileUploadApi,
  addressApi,
  ordersApi,
});

const rootReducer = {
  ...reducers,
  cart: cartSlice,
  auth: authSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

setupListeners(store.dispatch);
