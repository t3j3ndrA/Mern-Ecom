import React from "react";
import "react-awesome-slider/dist/styles.css";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
	margin: 30px auto;
`;

const Slider = () => {
	return (
		<>
			<Container>
				<Carousel fade>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/1/10/a30f2bb7-5173-4d0b-8622-4c71488167dd1641830519174-RTF-P0-Desktop-Banner.jpg"
							alt="First slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/1/10/9ed15cff-b992-446f-8bf1-452f4f12adcb1641832422150-Workwear-Essentials_Desk.jpg"
							alt="First slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/1/10/e2abb25c-5de9-40de-968b-6e3998897cb61641832422164-A-Line-Kurtas_Desk.jpg"
							alt="First slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/1/10/c647c96a-15d8-4eba-a04b-b4a011d565931641832422157-Casual-Shoes_Desk.jpg"
							alt="First slide"
						/>
					</Carousel.Item>
				</Carousel>
			</Container>
		</>
	);
};

export default Slider;
