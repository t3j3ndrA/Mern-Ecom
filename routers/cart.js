const router = require("express").Router();
const Cart = require("../models/Cart");
const {
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
	verifyToken,
} = require("./tokenVeri");

// Add User Cart
router.post("/add", verifyToken, async (req, res) => {
	const newCart = new Cart(req.body);
	try {
		const savedCart = await newCart.save();
		res.status(200).json({
			success: true,
			msg: `Cart addedd succesfuly!`,
			data: {
				cart: savedCart,
			},
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			msg: "Could Not add your cart items to server.",
			data: err,
		});
	}
});

// Update Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: { msg: "CartData updated Successfuly!", cart: updatedCart },
		});
	} catch (err) {
		res.status(403).json({ success: false, data: "You are not authorized" });
	}
});

// Delete User Cart

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.json({
			success: true,
			data: { msg: "User Cart deleted Successfuly!" },
		});
	} catch (err) {
		res.json({ success: false, data: { msg: "Could not find the Cart data" } });
	}
});

// ! Get User's Cart

router.get("/find/:userId", async (req, res) => {
	try {
		const userCart = await Cart.findOne({ userId: req.params.userId });
		res
			.status(200)
			.json({ success: true, data: { msg: "User Cart found!", userCart } });
	} catch (err) {
		res.status(500).json({
			success: false,
			data: {
				msg: "Something wrong in server! Could not find the User's Cart",
			},
		});
	}
});

// ! Get All Users Carts
// ! ONLY ADMINS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const carts = await Cart.find();
		res.status(200).json({
			success: true,
			data: { msg: "All users Cart data found!", carts },
		});
	} catch (err) {
		res.status(401).json({
			success: false,
			data: {
				msg: "Something wrong in server! Could not find Users cart data",
			},
		});
	}
});

module.exports = router;
