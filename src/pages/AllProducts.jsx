import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const AllProducts = () => {
	const location = useLocation();
	const category = location.pathname.split("/")[2];
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState({});
	const handleFilter = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFilters({ ...filters, [name]: value.toLowerCase() });
	};
	const handleSort = (e) => {
		const value = e.target.value;
		setSort(value);
	};
	return (
		<>
			<Navbar />
			<Announcement />
			{/* <Title>Filterings</Title> */}
			<FilterContainer>
				<FilterBox>
					<FilterTitle>Filter Products</FilterTitle>
					<Select name="color" onChange={handleFilter}>
						<Option value="blue">Blue</Option>
						<Option value="black">Black</Option>
						<Option value="red">Red</Option>
						<Option value="teal">Teal</Option>
						<Option value="pink">Pink</Option>
						<Option value="white">White</Option>
					</Select>
					<Select name="size" onChange={handleFilter}>
						<Option>S</Option>
						<Option>M</Option>
						<Option>L</Option>
						<Option>XL</Option>
					</Select>
				</FilterBox>

				<FilterBox>
					<FilterTitle>Sort Products</FilterTitle>
					<Select name="sort" onChange={handleSort}>
						<Option value="newest">Newest</Option>
						<Option value="asc">Price Asc.</Option>
						<Option value="dsc">Price Dec.</Option>
					</Select>
				</FilterBox>
			</FilterContainer>
			<Products category={category} filters={filters} sort={sort} />
			<Newsletter />
			<Footer />
		</>
	);
};

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 36px 24px;
`;

const FilterBox = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	gap: 16px;
`;
const FilterTitle = styled.p`
	font-weight: 600;
	font-size: 1.4rem;
`;
const Select = styled.select`
	padding: 0px;
	height: 30px;
`;

const Option = styled.option``;

export default AllProducts;
