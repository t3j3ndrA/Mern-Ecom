import React from "react";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "./pages/ForgetPassword";
import Notification from "./components/Notification";

const App = () => {
	return (
		<BrowserRouter>
			<Notification />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cart/" element={<Cart />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/products/:category" element={<AllProducts />} />
				<Route path="/product/:id" element={<SingleProduct />} />
				<Route path="/auth/forget-password" element={<ForgetPassword />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
