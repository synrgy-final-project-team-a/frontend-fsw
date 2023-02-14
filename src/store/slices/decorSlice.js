import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	searchOnTop: false,
	searchText: "",
	notifNum: 0,
}

const slice = createSlice({
	name: "decor",
	initialState,
	reducers: {
		searchIsTop: (state) => {
			state.searchOnTop = true
		},
		searchIsBottom: (state) => {
			state.searchOnTop = false
		},
		setSearchText: (state, { payload }) => {
			state.searchText = payload
		},
		resetSearchText: (state) => {
			state.searchText = ""
		},
		setNotifNum: (state, { payload }) => {
			state.notifNum = payload
		},
		resetNotifNum: (state) => {
			state.notifNum = 0
		},
	}
})

export const {
	searchIsTop,
	searchIsBottom,
	setSearchText,
	resetSearchText,
	setNotifNum,
	resetNotifNum
} = slice.actions

export const decorReducer = slice.reducer