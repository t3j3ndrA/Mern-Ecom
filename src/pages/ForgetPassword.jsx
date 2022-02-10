import React, { useState } from "react";
import styled from "styled-components";
import BackImg from "../assets/01.jpg";
import { setNotiError, setNotiSuccess } from "../redux/notificationSlice";
import { updateUser, logoutUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import API from "../axios/instance";
import { Link } from "react-router-dom";
import { ClipLoader, BarLoader } from "react-spinners";
const ForgetPassword = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleForgetPassword = async () => {
		setIsLoading(true);
		if (!email) {
			dispatch(setNotiError({ msg: "Email cannot be empty!" }));
			setIsLoading(false);
			return;
		}

		try {
			const data = { email };
			const res = await API.post("/auth/forget-password", data);
			if (res.data.success) {
				dispatch(setNotiSuccess({ msg: res.data.msg }));
				dispatch(updateUser(res.data.data));
			} else {
				dispatch(setNotiError({ msg: res.data.msg }));
			}
		} catch (err) {}
		setIsLoading(false);
	};
	return (
		<>
			<Container>
				<Wrapper>
					<Title>Forget Password</Title>
					<Form>
						<Input
							placeholder="Registered E-mail"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form>

					<RegisterButton onClick={handleForgetPassword} disabled={isLoading}>
						{!isLoading && "Get Credentials"}
						{isLoading && <ClipLoader color="white" size={20} />}
					</RegisterButton>
					<Link to="/login">
						<LinkContainer>
							<NativeLink>Login here</NativeLink>
						</LinkContainer>
					</Link>
				</Wrapper>
			</Container>
		</>
	);
};

const Container = styled.div`
	width: calc(100vw-20px);
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(#0000009b, #0000009b), url(${BackImg});
	background-position: center;
	background-size: cover;
	overflow: none;
`;

const Wrapper = styled.div`
	min-width: 30%;
	display: flex;
	flex-direction: column;
	background-color: white;
	padding: 20px 20px;
	/* box-shadow: 8px 8px 10px black; */
	box-shadow: 4px 4px 10px black;
	margin: 8px 4px;
`;

const Title = styled.h2`
	font-weight: 250;
`;

const Form = styled.form`
	margin: 16px 4px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const Input = styled.input`
	outline: none;
	width: 75%;
	flex: 80%;
	padding: 2px 5px;
	border-radius: 10px;
	border: 1px solid gray;
	margin: 6px auto;
`;

const RegisterButton = styled.button`
	min-width: 80px;
	padding: 4px 6px;
	outline: none;
	border: 1px solid teal;
	background-color: teal;
	color: white;
	transition: all 0.5s ease;
	&:hover {
		background-color: #014444e8;
	}
	&:disabled {
		cursor: not-allowed;
	}
`;
const NativeLink = styled.a`
	text-decoration: none;
	color: teal;
	font-size: 0.9rem;
	cursor: pointer;
`;

const LinkContainer = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
`;

export default ForgetPassword;
