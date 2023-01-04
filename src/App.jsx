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
			<button onClick={ handleButton }>tambah list</button>
			<h1>{ listNumber }</h1>
		</>
	);
}

export default App;
