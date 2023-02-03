import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "kos",
  storage,
};

const initialState = {
  status: 0,
  id: "",
  nama: "",
  deskripsi: "",
  jenis: {
    Putra: false,
    Putri: false,
    Campur: false,
  },
  foto: {
    fotoDepan: File,
    fotoDepanJalan: File,
    fotoDepanJauh: File,
  },
  tahun: "",
  alamat: "",
  kelurahan: "",
  kecamatan: "",
  kota: "",
  provinsi: "",
  peraturan: {
    "Ada jam malam": false,
    "Wajib sertakan KTP saat pengajuan sewa": false,
    "Lawan jenis dilarang ke kamar": false,
    "Tamu dilarang menginap": false,
    "Maks. 1 orang / kamar": false,
    "Maks. 2 orang / kamar": false,
    "Check out maks. pukul 12:00 (sewa harian)": false,
    "Check in pukul 14:00-21:00 (sewa harian)": false,
    "Termasuk listrik": false,
    "Dilarang merokok di kamar": false,
  },
  fasilitas: {
    Air: false,
    "Parkir Mobil": false,
    "Parkir Motor": false,
    Dispenser: false,
    Laundry: false,
    Dapur: false,
    "Ruang Jemur": false,
    "Ruang Tamu": false,
    Wifi: false,
    Kulkas: false,
    "Televisi (TV)": false,
    Listrik: false,
  },
};

export const slice = createSlice({
  name: "kos",
  initialState,
  reducers: {
    submitForm: (state, { payload }) => {
      return { ...state, ...payload };
    },
    emptyKos: () => initialState,
  },
});

export const { submitForm, jenisChange, emptyKos } = slice.actions;

export const kosPersistReducer = persistReducer(persistConfig, slice.reducer);
