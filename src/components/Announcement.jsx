import React from "react";
import styled from "styled-components";

const Announcement = () => {
	return <Container>Flat 50% OFF on first order. Hurry Up!</Container>;
};

const Container = styled.div`
	background-color: teal;
	color: white;
	text-align: center;
	font-weight: bold;
	font-size: 14;
	padding-top: 4px;
	padding-bottom: 4px;
`;

export default Announcement;
