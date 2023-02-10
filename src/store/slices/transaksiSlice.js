import { createSlice } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'transaksi',
	storage,
}

const initialState = {
	status: "",
	nama: "",
	gender: "",
	job: "",
	phone_number: "",
	check_in: "",
	price_id: "",
}

export const slice = createSlice({
	name: "transaksi",
	initialState,
	reducers: {
		addBooking: (state, { payload }) => {
			return { ...state, ...payload };
		},
		emptyBooking: () => initialState
	}
})

export const {
	addBooking,
	emptyBooking
} = slice.actions

export const transaksiPersistReducer = persistReducer(persistConfig, slice.reducer)