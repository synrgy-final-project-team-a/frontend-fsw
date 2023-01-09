import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Register from "./pages/register";
import './assets/scss/register.scss';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Register />} />
			</Routes>
		</>
	);
}

export default App;
