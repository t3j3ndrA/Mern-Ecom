import { Add, Remove } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import API from "../axios/instance";
import { useDispatch } from "react-redux";
import { setNotiSuccess } from "../redux/notificationSlice";
import { addToCart } from "../redux/cartSlice";

const SingleProduct = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [productCount, setProductCount] = useState(1);
	const [filters, setFilters] = useState({});

	const dispatch = useDispatch();

	const handleProductCountChange = (type) => {
		if (type === "inc") {
			setProductCount(productCount + 1);
		} else {
			productCount > 1 && setProductCount(productCount - 1);
		}
	};

	const handleFilters = (e) => {
		const value = e.target.value?.toLowerCase();
		setFilters({ color: product?.color, size: value });
	};

	const handleAddToCart = () => {
		dispatch(addToCart({ ...product, productCount, size: filters.size }));
		dispatch(setNotiSuccess({ msg: "Item added to cart." }));
	};

	useEffect(() => {
		const getProductById = async () => {
			const res = await API.get("products/find/" + id);
			setProduct(res.data.data.product);
		};
		id && getProductById();
	}, []);
	return (
		<>
			<Navbar />
			<Announcement />
			<ProductWrapper>
				<ImageContainer>
					<ProductImage src={product.img} />
				</ImageContainer>
				<InfoContainer>
					<ProductTitle>{product.title}</ProductTitle>
					<ProductDesc>{product.desc}</ProductDesc>
					<Price>₹ {product.price}</Price>

					<FilterContainer>
						<FilterBox>
							<FilterTitle>Colors</FilterTitle>
							<ColorBox color={product.color} />
						</FilterBox>
						<FilterBox>
							<FilterTitle>Size</FilterTitle>
							<Select onChange={handleFilters}>
								{product.size?.map((s) => (
									<Option>{s.toUpperCase()}</Option>
								))}
							</Select>
						</FilterBox>
					</FilterContainer>

					<PurchaseContainer>
						<ProductCountBox>
							<Remove
								style={{ cursor: "pointer" }}
								onClick={() => {
									handleProductCountChange("dec");
								}}
							/>
							<ProductCount>{productCount}</ProductCount>
							<Add
								style={{ cursor: "pointer" }}
								onClick={() => {
									handleProductCountChange("inc");
								}}
							/>
						</ProductCountBox>

						<AddToCartButton onClick={handleAddToCart}>
							ADD TO CART
						</AddToCartButton>
					</PurchaseContainer>
				</InfoContainer>
			</ProductWrapper>
			<Newsletter />
			<Footer />
		</>
	);
};

const ProductWrapper = styled.div`
	display: flex;
	margin: 50px 20px;
`;

const ImageContainer = styled.div`
	flex: 1;
	width: 100%;
	height: 85vh;
`;

const ProductImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const InfoContainer = styled.div`
	flex: 1;
`;

const ProductTitle = styled.h2`
	font-weight: 350;
`;

const ProductDesc = styled.p`
	letter-spacing: 0.15rem;
`;

const Price = styled.p`
	font-weight: 500;
	font-size: 1.5rem;
`;

const FilterContainer = styled.div`
	display: flex;
	gap: 40px;
	align-items: center;
`;

const FilterBox = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	gap: 16px;
	align-items: center;
`;
const FilterTitle = styled.span`
	font-weight: 350;
	font-size: 1.2rem;
`;

const ColorBox = styled.div`
	width: 35px;
	height: 35px;
	border-radius: 50%;
	border: 1px solid black;
	background-color: ${(props) => props.color};
`;

const Select = styled.select`
	padding: 0px;
	height: 30px;
`;

const Option = styled.option``;

const PurchaseContainer = styled.div`
	margin-top: 25px;
	display: flex;
	align-items: center;
	gap: 100px;
`;
const ProductCountBox = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const ProductCount = styled.span`
	font-weight: 500;
	border-radius: 10px;
	border: 1px solid teal;
	padding: 2px 10px;
	background-color: #f5f5f5;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const AddToCartButton = styled.button`
	border-radius: 10px;
	border: 1px solid teal;
	padding: 2px 8px;
`;

export default SingleProduct;
