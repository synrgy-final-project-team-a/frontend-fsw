import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/admin";
import PencariRoutes from "./routes/pencari";
import PenyewaRoutes from "./routes/penyewa";

const App = () => {

	const routesDefine = (element, path = "") => {
		return (element.map((el, i) => {
			if (el.hasOwnProperty('children')) {
				return routesDefine(el.children, path+el.path)
			} else if (el.hasOwnProperty('element')) {
				return <Route key={i} path={path+el.path} element={el.element} />
			} else {
				return <></>
			}
		}))
	}

	return (
		<BrowserRouter>
			<Routes>
				{routesDefine(PencariRoutes)}
				{routesDefine(AdminRoutes)}
				{routesDefine(PenyewaRoutes)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;