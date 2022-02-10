import React, { useState } from "react";
import styled from "styled-components";
import BackImg from "../assets/04.jpg";
import API from "../axios/instance";
import { setNotiError, setNotiSuccess } from "../redux/notificationSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
	const [user, setUser] = useState({});
	const handleUserChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch({});
	const hadleRegister = async () => {
		if (!user.firstname) {
			dispatch(setNotiError({ msg: "Firstname cannot be empty!" }));
			return;
		}
		if (!user.lastname) {
			dispatch(setNotiError({ msg: "Lastname cannot be empty!" }));
			return;
		}
		if (!user.username) {
			dispatch(setNotiError({ msg: "Username cannot be empty!" }));
			return;
		}
		if (!user.email) {
			dispatch(setNotiError({ msg: "Email cannot be empty!" }));
			return;
		}
		if (!user.password1) {
			dispatch(setNotiError({ msg: "Password cannot be empty!" }));
			return;
		}
		if (user.password1 !== user.password2) {
			dispatch(
				setNotiError({ msg: "Passwords doesn't maches. Please re-type." })
			);
			return;
		}
		setIsLoading(true);
		try {
			const userdata = {
				username: user.username,
				password: user.password1,
				email: user.email,
			};
			const res = await API.post("/auth/register", userdata);
			if (res.data.success) {
				dispatch(setNotiSuccess({ msg: res.data.msg }));
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
					<Title>Create An Account*</Title>
					<Form>
						<Input
							placeholder="First Name"
							name="firstname"
							onChange={handleUserChange}
						/>
						<Input
							placeholder="Last Name"
							name="lastname"
							onChange={handleUserChange}
						/>
						<Input
							placeholder="User Name"
							name="username"
							onChange={handleUserChange}
						/>
						<Input
							placeholder="E-mail"
							type="email"
							name="email"
							onChange={handleUserChange}
						/>
						<Input
							placeholder="Password Name"
							type="password"
							name="password1"
							onChange={handleUserChange}
						/>
						<Input
							placeholder="Confirm Password"
							type="password"
							name="password2"
							onChange={handleUserChange}
						/>
					</Form>
					<Agreement>
						*By creating an account, I consent to the processing of my personal
						data in accordance with the <b>Privacy Policy</b>
					</Agreement>

					<RegisterButton onClick={hadleRegister} disabled={isLoading}>
						{!isLoading && "Register"}
						{isLoading && <ClipLoader color="white" size={20} />}
					</RegisterButton>
					<LinkContainer>
						<Link to="/login">
							<NativeLink>Already have an account ?</NativeLink>
						</Link>
					</LinkContainer>
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
	background-position: 0px -300px;
	background-size: cover;
`;

const Wrapper = styled.div`
	min-width: 40%;
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
	width: 100px;
	flex: 40%;
	padding: 2px 5px;
	border-radius: 10px;
	border: 1px solid gray;
	margin: 6px auto;
`;

const Agreement = styled.p`
	font-size: 14px;
`;

const RegisterButton = styled.button`
	width: 80px;
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

export default Register;
