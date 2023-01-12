import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Register from "./pages/register";
import Login from "./pages/login";
import './assets/scss/register.scss';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/landing-page" element={<Register />} />
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
