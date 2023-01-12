import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgetPass from "./pages/forgetPassword";
import Dashboard from "./pages/dashboard";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/verif-email" element={<ForgetPass />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;