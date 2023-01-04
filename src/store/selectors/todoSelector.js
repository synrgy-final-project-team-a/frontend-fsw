import { createSelector } from "@reduxjs/toolkit";

export const todoListNumber = createSelector((state) => {
	return state.todo.listNumber
})