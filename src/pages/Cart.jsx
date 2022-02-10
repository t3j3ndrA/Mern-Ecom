import React, { useState, useEffect } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotiError, setNotiSuccess } from "../redux/notificationSlice";
import displayRazorpay from "./RazorPay";
import axios from "axios";
import { updateCartItems, updateItemQuantityById } from "../redux/cartSlice";
import ClipLoader from "react-spinners/ClipLoader";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}

const Cart = () => {
	const dispatch = useDispatch();
	const quantity = useSelector((state) => state.cart.quantity);
	const cartItems = useSelector((state) => state.cart.products);
	const totalAmount = useSelector((state) => state.cart.totalAmount);
	const userId = useSelector((state) => state.user.id);
	const [isLoading, setisLoading] = useState(false);

	const handleDeleteItem = async (id, quantity, price) => {
		const newTotalAmount = totalAmount - quantity * price;
		const newCartItems = cartItems.filter((item) => {
			if (item._id !== id) return item;
		});

		dispatch(
			updateCartItems({ products: newCartItems, totalAmount: newTotalAmount })
		);
	};
	const productCountChange = (delta, id) => {
		dispatch(updateItemQuantityById({ id, delta }));
	};

	const handleBuyNow = async () => {
		setisLoading(true);
		if (quantity > 0) {
			displayRazorpay(totalAmount, cartItems, userId);
		} else {
			dispatch(setNotiError({ msg: "Cart is empty!" }));
			setisLoading(false);
		}
	};

	const displayRazorpay = async (totalAmount, cartItems, userId) => {
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) {
			alert("Unable to load Payment gateway. Are you online?");
			return;
		}

		const result = await axios.post(
			"http://localhost:5000/api/payment/orders",
			{
				totalAmount: totalAmount * 100,
			}
		);

		if (!result) {
			dispatch(setNotiError({ msg: "Server error. Are you online?" }));
			return;
		}

		const { amount, id: order_id, currency } = result.data;

		const options = {
			key: "rzp_test_F7OXBJSFPTOSkM", // Enter the Key ID generated from the Dashboard
			amount: amount.toString(),
			currency: currency,
			name: "Urban Styles",
			description: "Proceed To Payment",
			image:
				"https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX35633090.jpg",
			order_id: order_id,
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					razorpaySignature: response.razorpay_signature,
				};
				cartItems = cartItems.map((item) => {
					return { productId: item._id, quantity: item.productCount };
				});
				const orderData = {
					userId: userId,
					products: cartItems,
					ammount: totalAmount,
					adress: "Gujrat, India.",
				};
				const result = await axios.post(
					"http://localhost:5000/api/payment/success",
					{ data, orderData }
				);
				dispatch(setNotiSuccess({ msg: result.data.msg }));
				setisLoading(false);
			},

			theme: {
				color: "teal",
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	return (
		<>
			<Navbar></Navbar>
			<Announcement />
			<Wrapper>
				<CartItemsContainer>
					<CartHeader>
						<MainTitle>
							{quantity ? "Shopping Cart" : "Your Bag is empty :("}
						</MainTitle>
						<PriceTitle>Price</PriceTitle>
					</CartHeader>
					<hr></hr>
					{cartItems?.map((item) => {
						return (
							<>
								<CartList key={item._id}>
									<ProductImageContainer>
										<ProductImage src={item.img}></ProductImage>
									</ProductImageContainer>
									<ProductDetails>
										<Link
											to={`/product/${item._id}`}
											style={{ textDecoration: "none", color: "inherit" }}
										>
											<ProductName>{item.title}</ProductName>
										</Link>
										<IsInStock>In Stock</IsInStock>
										<IsElligibleForFreeDelivery>
											Eligible For FREE Shipping
										</IsElligibleForFreeDelivery>
										<Color color={item.color}></Color>
										<Size>{item.size?.toUpperCase()}</Size>
										<ItemCounter>
											<Remove
												onClick={() => productCountChange(-1, item._id)}
											/>
											<ItemCount>{item.productCount}</ItemCount>
											<Add
												name="inc"
												onClick={() => productCountChange(1, item._id)}
											/>
										</ItemCounter>
										<DeleteItem
											onClick={() =>
												handleDeleteItem(
													item?._id,
													item?.productCount,
													item?.price
												)
											}
										>
											Delete
										</DeleteItem>
									</ProductDetails>
									<PriceDetails>
										<TotalProductPrice>
											₹ {item.price * item.productCount}{" "}
										</TotalProductPrice>
										<ProductPrice>₹ {item.price} / item </ProductPrice>
									</PriceDetails>
								</CartList>
								<hr></hr>
							</>
						);
					})}

					<CartFooter>
						Subtotal ({cartItems.length} items) : <b>₹ {totalAmount}</b>
					</CartFooter>
				</CartItemsContainer>

				<CheckoutContainer>
					<MainTitle style={{ textAlign: "center" }}>Order Summary</MainTitle>
					<ValueBox>
						<ValueName>Subtotal </ValueName>
						<ValuePrice>₹ {totalAmount}</ValuePrice>
					</ValueBox>
					<ValueBox>
						<ValueName>Estimated Shipping</ValueName>
						<ValuePrice>₹ {cartItems.length > 0 ? 100 : 0}</ValuePrice>
					</ValueBox>
					<ValueBox>
						<ValueName>Shipping Discount</ValueName>
						<ValuePrice>₹ {totalAmount}</ValuePrice>
					</ValueBox>
					<ValueBox>
						<ValueName type="total">Total</ValueName>
						<ValuePrice type="total">₹ {totalAmount}</ValuePrice>
					</ValueBox>
					<BuyButton
						onClick={() => handleBuyNow()}
						isEmpty={quantity > 0 ? "no" : "yes"}
						disable={isLoading}
					>
						{!isLoading && "Buy Now"}
						{isLoading && <ClipLoader color="white" size={20} />}
					</BuyButton>
				</CheckoutContainer>
			</Wrapper>
			<Footer />
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	gap: 20px;
	margin: 30px 10px;
	flex-wrap: wrap;
`;

const CartItemsContainer = styled.div`
	flex: 8;
`;

const CheckoutContainer = styled.div`
	flex: 3;
	border: 1px solid gray;
	height: 280px;
	padding: 10px 10px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;
const CartHeader = styled.div`
	display: flex;
	padding: 4px 10px;
	justify-content: space-between;
`;

const MainTitle = styled.h1`
	font-size: 2em;
`;
const PriceTitle = styled.p`
	align-self: flex-end;
`;

const CartList = styled.div`
	display: flex;
	padding: 4px 10px;
`;
const ProductImageContainer = styled.div`
	flex: 1;
	padding: 10px;
	height: 200px;
`;

const ProductImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const ProductDetails = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const ProductName = styled.span`
	font-size: 1.4rem;
	font-weight: 450;
`;
const IsInStock = styled.span`
	font-size: 0.9rem;
	color: green;
`;
const IsElligibleForFreeDelivery = styled.span`
	font-size: 0.9rem;
`;
const Color = styled.div`
	margin: 2px 0px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;
const Size = styled.span`
	font-weight: 800;
`;
const ItemCounter = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;
const ItemCount = styled.span`
	margin-top: 8px;
	font-weight: 700;
	font-size: 1.3rem;

	padding: 0px 10px;
	background-color: #fafafa;
	border: 1px solid gray;
	border-radius: 10px;
`;

const TotalProductPrice = styled.span`
	/* flex: 1; */
	font-weight: 500;
	font-size: 2rem;
	text-align: right;
`;
const ProductPrice = styled.span`
	/* flex: 1; */
	/* font-weight: 500; */
	font-size: 1rem;
	text-align: right;
`;

const ValueBox = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1px 8px;
`;
const ValueName = styled.span`
	font-size: ${(props) => (props.type === "total" ? "24px" : "18px")};
	font-weight: ${(props) => (props.type === "total" ? 500 : 300)};
`;
const ValuePrice = styled.span`
	font-size: ${(props) => (props.type === "total" ? "24px" : "18px")};
	font-weight: ${(props) => (props.type === "total" ? 500 : 300)};
`;
const CartFooter = styled.div`
	padding: 2px 10px;
	font-size: 1.2rem;
	text-align: right;
`;

const BuyButton = styled.button`
	width: 70%;
	padding: 4px 6px;
	outline: none;
	border: 1px solid teal;
	background-color: teal;
	color: white;
	border-radius: 20px;
	margin-top: 8px;
	align-self: center;
	&:hover {
		background-color: #014444e8;
	}
	&:disabled {
		cursor: not-allowed;
	}
`;

const PriceDetails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const DeleteItem = styled.span`
	margin-top: 8px;
	color: red;
	cursor: pointer;
`;

export default Cart;
