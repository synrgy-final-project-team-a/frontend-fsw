import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	list: [],
	listNumber: 3
}

const slice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addList: (state) => {
			state.listNumber++
		}
	}
})

export const { addList } = slice.actions

export default slice.reducer