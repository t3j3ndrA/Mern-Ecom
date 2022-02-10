import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { productData } from "../data/productData";
import ProductItemView from "./ProductItemView";
import { device } from "../responsiveness/responsive";
import API from "../axios/instance";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Products = ({ category, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getProducts = async () => {
			setIsLoading(true);
			try {
				const res = await axios.get(
					category
						? `http://localhost:5000/api/products?category=${category}`
						: "http://localhost:5000/api/products"
				);
				setProducts(res.data.data.products);
			} catch (err) {}
			setIsLoading(false);
		};
		getProducts();
	}, [category]);

	useEffect(() => {
		setIsLoading(true);
		category &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						item[key].includes(value)
					)
				)
			);
		setIsLoading(false);
	}, [products, category, filters]);

	useEffect(() => {
		setIsLoading(true);
		if (sort === "newest") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt)
			);
		} else if (sort === "asc") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price)
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price)
			);
		}
		setIsLoading(false);
	}, [sort]);
	return (
		<>
			<LoadingContainer>
				{isLoading && <ClipLoader color="teal" size={50} />}
			</LoadingContainer>
			<Container>
				{category
					? filteredProducts.map((item) => (
							<ProductItemView item={item} key={item.id} />
					  ))
					: products
							.slice(0, 7)
							.map((item) => <ProductItemView item={item} key={item.id} />)}
				{/* {category && filteredProducts.length > 0
				? filteredProducts?.map((item) => <ProductItemView item={item} />)
			: products.slice(0, 8).map((item) => <ProductItemView item={item} />)} */}
				{/* {filteredProducts.slice(0, 8).map((item) => (
				<ProductItemView item={item} />
			))} */}
			</Container>
		</>
	);
};

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-grow: 0;
	/* align-items: flex-start; */
	justify-content: center;
	/* justify-items: flex-start; */
	gap: 4px;
	margin: 16px 4px;
	@media ${device.mobileL} {
		flex-direction: column;
	}
`;

export default Products;
