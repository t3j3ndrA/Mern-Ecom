import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const KEY =
	"pk_test_51KH8zMSE4K7KeIdkCkbb0DaC3wGFxNAARnCkYjdbClWvNqCaBCXLetwnBy81S07cv75b5MT7ChLpyeeK25JLnXxd00intCePXZ";

const Button = styled.button`
	color: "white";
	background-color: "black";
	border: 1px solid white;
	border-radius: 12px;
	padding: 2px 8px;
`;
const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PaymentTest = () => {
	const [stripeToken, setstripeToken] = useState(null);
	const onToken = (token) => {
		setstripeToken(token);
	};
	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await axios.post(
					"http://localhost:5000/api/checkout/payment",
					{
						tokenId: stripeToken.id,
						ammount: 9999,
					}
				);
			} catch (err) {}
		};

		stripeToken && makeRequest();
	}, [stripeToken]);
	return (
		<Container>
			<StripeCheckout
				name="Urban Styles"
				image="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX35633090.jpg"
				billingAddress
				currency="USD"
				zipCode
				amount={9999}
				shippingAddress
				token={onToken}
				stripeKey={KEY}
			>
				<Button>Checkout Now</Button>
			</StripeCheckout>
		</Container>
	);
};

export default PaymentTest;
