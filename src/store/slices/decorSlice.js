import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	searchOnTop: false
}

const slice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		searchIsTop: (state) => {
			state.searchOnTop = true
		},
		searchIsBottom: (state) => {
			state.searchOnTop = false
		}
	}
})

export const {
	searchIsTop,
	searchIsBottom
} = slice.actions

export default slice.reducer