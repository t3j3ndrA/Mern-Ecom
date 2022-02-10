import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CategoryItemView = ({ item }) => {
	return (
		<Container key={item.id}>
			<ImgContainer>
				<Img src={item.img} />
			</ImgContainer>
			<InfoContainer>
				{/* <Title>
                    {item.title}
                </Title> */}
				<Link to={`/products/${item.category}`}>
					<Button>Shop Now</Button>
				</Link>
			</InfoContainer>
		</Container>
	);
};

const Container = styled.div`
	flex: 1;
	margin: 0px 2px;
	background-color: #f3f3f3;
`;

const ImgContainer = styled.div`
	height: 70vh;
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const InfoContainer = styled.div`
	/* position : absolute; */
	/* width: 100%; */
	/* height : 100%; */
	/* top : 0;
    left : 0; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h2`
	color: white;
`;

const Button = styled.button`
	margin: 15px auto;
	font-size: 1.2rem;
	color: white;
	background-color: black;
	border: none;
	border-radius: 10px;
	font-weight: 600;
	padding: 4px 8px;
	z-index: 1000;
`;

export default CategoryItemView;
