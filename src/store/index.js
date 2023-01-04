import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";

const store = preloadedState => configureStore({
	preloadedState: preloadedState,
	reducer: {
		todo: todoSlice
	}
})

export default store