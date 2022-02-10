const router = require("express").Router();
const User = require("../models/User");
const {
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./tokenVeri");

// Update User Data
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
	if (req.body.password) {
		req.body.password = CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_KEY
		);
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: { msg: "Usedata updated Successfuly!", user: updatedUser },
		});
	} catch (err) {
		res.status(403).json({ success: false, data: "You are not authorized" });
	}
});

// Delete User

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ success: true, data: { msg: "User deleted Successfuly!" } });
	} catch (err) {
		res.json({ success: false, data: { msg: "Could not find the User" } });
	}
});

//! Get Single user
// !Only admins can access this route

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res
			.status(200)
			.json({ success: true, data: { msg: "User found!", oneuser: user } });
	} catch (err) {
		res.status(200).json({
			success: false,
			data: { msg: "Something wrong in server! Could not find the user" },
		});
	}
});

// ! Get all users

// ! Only admins can access this route

router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const users = await User.find();

		res
			.status(200)
			.json({ success: true, data: { msg: "Users found!", users: users } });
	} catch (err) {
		res.status(401).json({
			success: false,
			data: { msg: "Something wrong in server! Could not find users" },
		});
	}
});

// Get Users Staes
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
	try {
		const data = await User.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 },
				},
			},
		]);

		res.status(200).json({ success: true, data: data });
	} catch (err) {
		res.status(500).json({ success: false, data: err });
	}
});
module.exports = router;
