import { SendOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { device } from "../responsiveness/responsive";

const Newsletter = () => {
	return (
		<Container>
			<Title>Newsletters</Title>
			<Desc>Get timely updates from your favorite products!</Desc>
			<InputContainer>
				<InputBox placeholder="Enter e-mail..." />
				<Icon>
					<SendOutlined style={{ color: "teal" }} />
				</Icon>
			</InputContainer>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-bottom: 28px;
	padding: 7rem 2rem;
	@media ${device.mobileL} {
		padding: 0px 0px;
	}
`;

const Title = styled.h1`
	font-weight: 700;
	font-size: 3rem;
`;

const Desc = styled.p`
	font-size: 24px;
	color: teal;
	text-align: center;
	@media ${device.mobileL} {
		font-size: 16px;
	}
`;

const InputContainer = styled.div`
	border: 1px solid gray;
	border-radius: 10px;
	padding: 2px 8px;
	display: flex;
`;

const InputBox = styled.input`
	border: none;
	outline: none;
	flex: 10;
	width: 400px;
	@media ${device.mobileL} {
		width: 150px;
	}
`;

const Icon = styled.div`
	flex: 1;
`;

export default Newsletter;
