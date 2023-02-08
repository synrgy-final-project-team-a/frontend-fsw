import { createSlice } from "@reduxjs/toolkit"

const initialState = {
<<<<<<< HEAD
	searchOnTop: false
}

const slice = createSlice({
	name: "todo",
=======
	searchOnTop: false,
	searchText: ""
}

const slice = createSlice({
	name: "decor",
>>>>>>> 07acb04e97f2c54e37878b5fcf9b34ef9b31171a
	initialState,
	reducers: {
		searchIsTop: (state) => {
			state.searchOnTop = true
		},
		searchIsBottom: (state) => {
			state.searchOnTop = false
<<<<<<< HEAD
		}
=======
		},
		setSearchText: (state, { payload }) => {
			state.searchText = payload
		},
		resetSearchText: (state) => {
			state.searchText = ""
		},
>>>>>>> 07acb04e97f2c54e37878b5fcf9b34ef9b31171a
	}
})

export const {
	searchIsTop,
<<<<<<< HEAD
	searchIsBottom
=======
	searchIsBottom,
	setSearchText,
	resetSearchText
>>>>>>> 07acb04e97f2c54e37878b5fcf9b34ef9b31171a
} = slice.actions

export default slice.reducer