import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		quantity: 0,
		products: [],
		totalAmount: 0,
	},
	reducers: {
		addToCart: (state, action) => {
			state.quantity += 1;
			state.products.push(action.payload);
			state.totalAmount += action.payload.price * action.payload.productCount;
		},
		makeCartEmpty: (state, action) => {
			state.quantity = 0;
			state.products = [];
			state.totalAmount = 0;
		},
		updateCartItems: (state, action) => {
			state.quantity -= 1;
			state.products = action.payload.products;
			state.totalAmount = action.payload.totalAmount;
		},
		updateItemQuantityById: (state, action) => {
			// state.products = action.payload.products;
			const id = action.payload.id;
			const delta = action.payload.delta;
			for (let i = 0; i < state.products.length; ++i) {
				if (state.products[i]._id === id) {
					state.products[i].productCount += delta;
					state.totalAmount += delta * state.products[i].price;
					if (state.products[i].productCount < 1) {
						state.totalAmount += state.products[i].price;
						state.products[i].productCount = 1;
					}
				}
			}
		},
	},
});

export const {
	addToCart,
	makeCartEmpty,
	updateCartItems,
	updateItemQuantityById,
} = cartSlice.actions;
export default cartSlice.reducer;
