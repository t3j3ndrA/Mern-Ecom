import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { device } from "../responsiveness/responsive";
import { Link } from "react-router-dom";
import { updateUser, logoutUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setNotiError } from "../redux/notificationSlice";
import { makeCartEmpty } from "../redux/cartSlice";

const Navbar = () => {
	const cartProductsCount = useSelector((states) => states.cart.quantity);
	const { id, token, isLoggedIn, userName } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();
	const handleLogOut = () => {
		dispatch(logoutUser());
		dispatch(makeCartEmpty());
	};

	const handleCartClick = () => {
		if (!isLoggedIn) {
			dispatch(setNotiError({ msg: "Please login to continue" }));
		}
	};

	return (
		<Container>
			<Wrapper>
				<Left>
					<Link to="/" style={{ textDecoration: "none" }}>
						<LogoImage src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX35633090.jpg" />
					</Link>
					<Language> EN</Language>
					<SearchBox>
						<SearchBar placeholder="search.."></SearchBar>
						<Search style={{ color: "gray", fontSize: 18 }} />
					</SearchBox>
				</Left>
				<Center>
					<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
						<LogoText>Urban Styles</LogoText>
					</Link>
				</Center>
				<Right>
					{!isLoggedIn && (
						<Link
							to="/register"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<MenuItem>Register</MenuItem>
						</Link>
					)}
					{!isLoggedIn && (
						<Link
							to="/login"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<MenuItem>Sign In</MenuItem>
						</Link>
					)}
					{isLoggedIn && <MenuItem>{userName}</MenuItem>}
					{isLoggedIn && <MenuItem onClick={handleLogOut}>Logout</MenuItem>}
					<Link
						to={isLoggedIn ? "/cart" : "/login"}
						style={{ textDecoration: "none", color: "inherit" }}
						onClick={handleCartClick}
					>
						<MenuItem>
							<Badge badgeContent={cartProductsCount} color="primary" max={9}>
								<ShoppingCartOutlined styled={{ color: "teal" }} />
							</Badge>
						</MenuItem>
					</Link>
				</Right>
			</Wrapper>
		</Container>
	);
};

const Container = styled.div`
	height: 60px;
	@media ${device.tablet} {
		display: none;
	}
`;

const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;
const Center = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	@media ${device.mobileL} {
		flex: 2;
	}
`;

// under lEFT
const Language = styled.div`
	cursor: pointer;
	@media ${device.mobileL} {
		display: none;
	}
`;

const SearchBox = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid gray;
	margin-left: 8px;
	@media ${device.mobileL} {
		margin-left: 2px;
	}
`;
const SearchBar = styled.input`
	border: none;
	outline: none;
	padding: 2px 2px;
	@media ${device.mobileL} {
		width: 40px;
		height: 10px;
	}
`;
// under CENTER

const LogoText = styled.span`
	font-size: 2rem;
	font-weight: 800;
	cursor: pointer;
`;
const LogoImage = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	overflow: hidden;
	object-fit: contain;
	margin-right: 30px;
`;
// under RIGHT
const MenuItem = styled.div`
	text-decoration: none;
	cursor: pointer;
	margin-left: 8px;
	margin-right: 8px;
	@media ${device.mobileL} {
		margin-left: 3px;
		margin-right: 3px;
	}
`;

export default Navbar;
