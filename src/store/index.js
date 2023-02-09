import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import authApi from "./apis/authentication";
import kosApi from "./apis/kos";
import usersApi from "./apis/users";
import chatApi from "./apis/chat";


import { alamatReducer } from "./slices/alamatSlice";
import { authPersistReducer } from "./slices/authSlice";
import decorReducer from "./slices/decorSlice";
import { kosPersistReducer } from "./slices/kosSlice";
import { userPersistReducer } from "./slices/userSlice";
import { chatPersistReducer } from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [kosApi.reducerPath]: kosApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    auth: authPersistReducer,
    user: userPersistReducer,
    decor: decorReducer,
    kos: kosPersistReducer,
    alamat: alamatReducer,
    chat: chatPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      usersApi.middleware,
      kosApi.middleware,
      chatApi.middleware,
    ]),
});

export const persistor = persistStore(store);
