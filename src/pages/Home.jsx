import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";

const Home = () => {
	return (
		<>
			<Announcement />
			<Navbar />
			<Slider />
			<CenteredTitle>Popular Categories</CenteredTitle>
			<Categories />
			<CenteredTitle>Trending Products</CenteredTitle>
			<Products />
			<Newsletter />
			<Footer />
		</>
	);
};

const CenteredTitle = styled.h2`
	text-align: center;
	margin: 50px 0px;
	font-size: 2rem;
	font-weight: 600;
	letter-spacing: 0.15rem;
`;

export default Home;
