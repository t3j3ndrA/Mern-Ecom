import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Slice Import
import cartSlice from "./cartSlice";
import notificationSlice from "./notificationSlice";
import userSlice from "./userSlice";

// For State persistance on refresh
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

// Like local storage
import storage from "redux-persist/lib/storage";

// Persistance Configurations
const persistConfig = {
	key: "root",
	// version: 1,
	storage,
};

// Combining all the reducers
const rootReducer = combineReducers({
	cart: cartSlice,
	notification: notificationSlice,
	user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export let persistor = persistStore(store);
