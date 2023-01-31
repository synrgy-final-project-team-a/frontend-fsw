import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';

import authApi from "./apis/authentication";
import usersApi from "./apis/users";

import { alamatReducer } from "./slices/alamatSlice";
import { authPersistReducer } from "./slices/authSlice";
import { kosPersistReducer } from "./slices/kosSlice";
import { userPersistReducer } from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		auth: authPersistReducer,
		user: userPersistReducer,
		kos: kosPersistReducer,
		alamat: alamatReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat([
			authApi.middleware,
			usersApi.middleware,
		]),
})

export const persistor = persistStore(store)