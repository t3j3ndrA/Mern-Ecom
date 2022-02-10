import React from "react";
import { CategoryData } from "../data/categoryData";
import CategoryItemView from "./CategoryItemView";
import styled from "styled-components";
import { device } from "../responsiveness/responsive";

const Categories = () => {
	return (
		<Container>
			{CategoryData.map((item) => (
				<CategoryItemView item={item} key={item.id} />
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	margin: 16px 4px;
	@media ${device.mobileL} {
		flex-direction: column;
	}
`;

export default Categories;
