import AdminLayout from "../../layouts/admin.layout"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { todosReceived } from "../../store/slices/todoSlice"

const Test = () => {

	const test = useSelector((state) => state.todo)
	useEffect(() => {
	}, [test])

	const handleClick = () => {
		console.log("clicked")
		const todo = [
			{
				"asd": "asd"
			},
			{
				"qwe": "qwe"
			},
		]
		todosReceived("asdasd")
	}

	return (
		<>
			<AdminLayout>
				<button onClick={handleClick}>add one book</button>
			</AdminLayout>
		</>
	)
}

export default Test