const router = require("express").Router();
const Order = require("../models/Order");
const {
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
	verifyToken,
} = require("./tokenVeri");

// Order an order
router.post("/add", verifyTokenAndAuthorization, async (req, res) => {
	const newOrder = Order(req.body);
	try {
		const savedOrder = await newOrder.save();
		res.status(200).json({
			success: true,
			data: {
				msg: `Ordered succesfuly!`,
				order: savedOrder,
			},
		});
	} catch (err) {
		res.status(500).json({ success: false, data: err });
	}
});

// ! Update an Order
// ! ONLY ADMINS
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: { msg: "OrderData updated Successfuly!", Order: updatedOrder },
		});
	} catch (err) {
		res.status(403).json({ success: false, data: "You are not authorized" });
	}
});

// Delete order

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.json({
			success: true,
			data: { msg: "User Order deleted Successfuly!" },
		});
	} catch (err) {
		res.json({
			success: false,
			data: { msg: "Could not find the Order data" },
		});
	}
});

//  Get User's Order
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const userOrders = await Order.findOne({ userId: req.params.userId });
		res.status(200).json({
			success: true,
			data: { msg: "User Order(s) found!", userOrders },
		});
	} catch (err) {
		res.status(200).json({
			success: false,
			data: {
				msg: "Something wrong in server! Could not find the User's Orders",
			},
		});
	}
});

// ! Get All Users ORDERS
// ! ONLY ADMINS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json({
			success: true,
			data: { msg: "All users Cart data found!", orders },
		});
	} catch (err) {
		res.status(401).json({
			success: false,
			data: {
				msg: "Something wrong in server! Could not find Users Order data",
			},
		});
	}
});

// ! Income
// ! ONLY ADMINS

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

	try {
		const income = await Order.aggregate([
			{ $match: { createdAt: { $gte: prevMonth } } },
			{
				$project: {
					month: { $month: "$createdAt" },
					sales: "$ammount",
				},
				$group: {
					_id: "$month",
					total: { $sum: "$sales" },
				},
			},
		]);

		res.status(200).json({ success: true, data: income });
	} catch (err) {
		res.status(500).json({ success: false, data: err });
	}
});

module.exports = router;
