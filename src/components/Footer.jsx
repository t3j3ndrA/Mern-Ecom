import {
	Facebook,
	Instagram,
	MailOutlined,
	Room,
	Twitter,
	Phone,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { device } from "../responsiveness/responsive";

const Footer = () => {
	return (
		<Container>
			<Left>
				<Logo>Urban Styles</Logo>
				<SiteDesc>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
					perferendis placeat nisi ullam necessitatibus quibusdam adipisci ad
					odio nostrum, quam natus quas facere velit ipsa.
				</SiteDesc>
				<SocialContainer>
					<Icon color="#4267B2">
						<Facebook style={{ fontSize: "40px", color: "white" }} />
					</Icon>
					<Icon color="#1DA1F2">
						<Twitter style={{ fontSize: "40px", color: "white" }} />
					</Icon>
					<Icon color="#e95950">
						<Instagram style={{ fontSize: "40px", color: "white" }} />
					</Icon>
				</SocialContainer>
			</Left>
			<Center>
				<Title>Quick Links</Title>
				<List>
					<ListItem>Home</ListItem>
					<ListItem>Cart</ListItem>
					<ListItem>Man Fashion</ListItem>
					<ListItem>Women Fashion</ListItem>
					<ListItem>Accessoried</ListItem>
					<ListItem>My Account</ListItem>
					<ListItem>Order Tracking</ListItem>
					<ListItem>Whishlist</ListItem>
					<ListItem>Terms</ListItem>
				</List>
			</Center>
			<Right>
				<Title>Contact</Title>
				<IconBox>
					<IconBoxIcon>
						<Room style={{ color: "teal" }} />
					</IconBoxIcon>
					<IconBoxInfo>Near Lonawala, Navi Mumbai.</IconBoxInfo>
				</IconBox>
				<IconBox>
					<IconBoxIcon>
						<Phone style={{ color: "teal" }} />
					</IconBoxIcon>
					<IconBoxInfo>+91 12345 54321</IconBoxInfo>
				</IconBox>
				<IconBox>
					<IconBoxIcon href>
						<MailOutlined style={{ color: "teal" }} />
					</IconBoxIcon>
					<IconBoxInfo>contacts@urbanstyles.com</IconBoxInfo>
				</IconBox>
				<Payment src="https://store-cdn.arduino.cc/uni/wysiwyg/Payment_Options.jpg" />
			</Right>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	gap: 1rem;
	padding: 16px 16px;
	background-color: #363636;
	border-top: 0.2px solid gray;
	@media ${device.mobileL} {
		flex-direction: column;
	}
`;
const Left = styled.div`
	flex: 1;
`;
const Center = styled.div`
	flex: 1;
	@media ${device.mobileL} {
		display: none;
	}
`;
const Right = styled.div`
	flex: 1;
`;

// Under Left

// Logo
const Logo = styled.h1`
	font-size: 2rem;
	font-weight: 800;
	color: white;
`;
// Site Description

const SiteDesc = styled.p`
	color: white;
`;

// Social Icons
const SocialContainer = styled.div`
	display: flex;
	margin-top: 30px;
	justify-content: space-evenly;
	align-items: center;
	/* gap: 10px; */
`;

const Icon = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.color};
	cursor: pointer;
	&hover {
		transform: scale(1.5);
	}
`;

// Under Center
// Title
const Title = styled.h2`
	color: white;
`;
// Usefull Links
const List = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1 1;
	color: white;
`;
const ListItem = styled.li`
	color: white;
`;
// Under Right

const IconBox = styled.div`
	display: flex;
	gap: 16px;
`;
const IconBoxIcon = styled.div``;
const IconBoxInfo = styled.p`
	color: white;
`;

const Payment = styled.img`
	height: 75px;
	width: auto;
	border: 1px solid gray;
	border-radius: 10px;
	overflow: hidden;
`;

export default Footer;
