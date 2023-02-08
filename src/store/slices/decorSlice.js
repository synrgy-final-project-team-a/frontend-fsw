import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	searchOnTop: false,
	searchText: ""
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
	}
})

export const {
	searchIsTop,
	searchIsBottom,
	setSearchText,
	resetSearchText
} = slice.actions

export default slice.reducer