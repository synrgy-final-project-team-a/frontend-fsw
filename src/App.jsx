import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Register from "./pages/register";
import './assets/scss/register.scss';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
