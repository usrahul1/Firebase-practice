import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyNavbar from "./components/Navbar";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Orders from "./pages/Orders";

function App() {
	return (
		<div>
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/book/list" element={<List />} />
				<Route path="/book/view/:bookId" element={<Detail />} />
				<Route path="/book/orders" element={<Orders />} />
			</Routes>
		</div>
	);
}

export default App;
