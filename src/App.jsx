import { useDispatch, useSelector } from "react-redux";
import { addList } from "./store/slices/todoSlice";

function App() {
	const dispatch = useDispatch()

	const listNumber = useSelector((state) => {
		return state.todo.listNumber
	})

	const handleButton = () => {
		dispatch(addList())
	}

	return (
		<>
			<h1>Hai</h1>
			<div className="container">
				<button className="btn btn-primary" onClick={ handleButton }>tambah list</button>
			</div>
			<h1>{ listNumber }</h1>
		</>
	);
}

export default App;
