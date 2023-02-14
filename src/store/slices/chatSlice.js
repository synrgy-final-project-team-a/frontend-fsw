import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "chat",
  storage,
};

const initialState = {
  current: {},
};

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChat: (state, { payload }) => {
      state.newChat = payload;
    },
    addlistRoomChat: (state, { payload }) => {
      state.listRoomChat = payload;
    },
    addHistoryChat: (state, { payload }) => {
      state.historyChat = payload;
    },
  },
});

export const { createChat, addlistRoomChat, addHistoryChat } = slice.actions;

export const chatPersistReducer = persistReducer(persistConfig, slice.reducer);
