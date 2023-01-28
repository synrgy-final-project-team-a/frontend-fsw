import { createSlice } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'kos',
	storage,
}

const initialState = {
	id: "",
	nama: "",
	deskripsi: "",
	jenis: [
		{
			text: "Putra",
			value: false
		},
		{
			text: "Putri",
			value: false
		},
		{
			text: "Campur",
			value: false
		}
	],
	foto: [],
	tahun: "",
	peraturan: [
		{
			text: "Ada jam malam",
			value: false
		},
		{
			text: "Wajib sertakan KTP saat pengajuan sewa",
			value: false
		},
		{
			text: "Lawan jenis dilarang ke kamar",
			value: false
		},
		{
			text: "Tamu dilarang menginap",
			value: false
		},
		{
			text: "Maks. 1 orang / kamar",
			value: false
		},
		{
			text: "Maks. 2 orang / kamar",
			value: false
		},
		{
			text: "Check out maks. pukul 12:00 (sewa harian)",
			value: false
		},
		{
			text: "Check in pukul 14:00-21:00 (sewa harian)",
			value: false
		},
		{
			text: "Termasuk listrik",
			value: false
		},
		{
			text: "Dilarang merokok di kamar",
			value: false
		},
	],
	fasilitas: [
		{
			text: "Air",
			value: false
		},
		{
			text: "Parkir Mobil",
			value: false
		},
		{
			text: "Parkir Motor",
			value: false
		},
		{
			text: "Dispenser",
			value: false
		},
		{
			text: "Laundry",
			value: false
		},
		{
			text: "Dapur",
			value: false
		},
		{
			text: "Ruang Jemur",
			value: false
		},
		{
			text: "Ruang Tamu",
			value: false
		},
		{
			text: "Wifi",
			value: false
		},
		{
			text: "Kulkas",
			value: false
		},
		{
			text: "Televisi (TV)",
			value: false
		},
		{
			text: "Listrik",
			value: false
		},
	],
}

export const slice = createSlice({
	name: "kos",
	initialState,
	reducers: {
		submitForm: (state, { payload }) => {
			return {...state, ...payload}
		},
		jenisChange: (state, { payload }) => {
			state.jenis[payload].value = !state.jenis[payload].value
		},
		emptyKos: () => initialState
	}
})

export const {
	submitForm,
	jenisChange,
	emptyKos
} = slice.actions

export const kosPersistReducer = persistReducer(persistConfig, slice.reducer)