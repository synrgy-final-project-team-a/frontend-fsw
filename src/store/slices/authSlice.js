import { createSlice } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'auth',
	storage,
}

const initialState = {
	token: {},
	email: ""
}

export const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		addToken: (state, { payload }) => {
			state.token = payload
		},
		addEmail: (state, { payload }) => {
			state.email = payload
		}
	}
})

export const { addToken, addEmail } = slice.actions

export const authPersistReducer = persistReducer(persistConfig, slice.reducer)