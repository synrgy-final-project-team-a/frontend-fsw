import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';

import authApi from "./apis/authentication";
import usersApi from "./apis/users";

import { authPersistReducer } from "./slices/authSlice";
import { userPersistReducer } from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		auth: authPersistReducer,
		user: userPersistReducer
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