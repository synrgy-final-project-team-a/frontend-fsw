import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

const todoAdapter = createEntityAdapter()

const initialState = {
	list: [],
	listNumber: 3
}

const slice = createSlice({
	name: "todo",
	initialState: todoAdapter.getInitialState(),
	reducers: {
		todoAdded: todoAdapter.addOne,
		todosReceived: (state, action) => {
			console.log(action)
			todoAdapter.setAll(state, action.payload.todos)
		},
	}
})

export const { todoAdded, todosReceived } = slice.actions

export default slice.reducer