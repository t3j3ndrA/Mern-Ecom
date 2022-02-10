import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { closeNoti } from "../redux/notificationSlice";
import { useSelector, useDispatch } from "react-redux";

const Notification = () => {
	const dispatch = useDispatch();
	const dis = useSelector((state) => state.notification.dis);
	const color = useSelector((state) => state.notification.color);
	const msg = useSelector((state) => state.notification.msg);
	const handleButton = () => {
		dispatch(closeNoti());
	};
	return (
		<Container dis={dis} color={color}>
			<Message>{msg}</Message>
			<Button onClick={handleButton}>
				<Close />
			</Button>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	width: 100%;
	padding: 2px 20px;
	justify-content: center;
	justify-content: space-between;
	background: ${(props) => props.color};
	color: white;
	transition: all 1s ease;
	font-weight: 600;
	display: ${(props) => props.dis};
`;

const Message = styled.span`
	flex: 30;
	text-align: center;
`;

const Button = styled.span`
	flex: 1;
	/* border-radius: 50px; */
	/* border: 1px solid white; */
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 2s ease;
`;

export default Notification;
