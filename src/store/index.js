import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';

import authApi from "./apis/authentication";
import transactionApi from "./apis/transaction";
import usersApi from "./apis/users";
import kosApi from "./apis/kos";
import transaksiApi from "./apis/transaksi";



import { authPersistReducer } from "./slices/authSlice";
import { userPersistReducer } from "./slices/userSlice";
import { kosPersistReducer } from "./slices/kosSlice";
import { transaksiPersistReducer } from "./slices/transaksiSlice";

import { decorReducer } from "./slices/decorSlice";
import { alamatReducer } from "./slices/alamatSlice";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[kosApi.reducerPath]: kosApi.reducer,
		[transactionApi.reducerPath]: transactionApi.reducer,
		[transaksiApi.reducerPath]: transaksiApi.reducer,
		auth: authPersistReducer,
		user: userPersistReducer,
		kos: kosPersistReducer,
		transaksi: transaksiPersistReducer,
		decor: decorReducer,
		alamat: alamatReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat([
			authApi.middleware,
			usersApi.middleware,
			kosApi.middleware,
			transactionApi.middleware,
			transaksiApi.middleware
		]),
})

export const persistor = persistStore(store)