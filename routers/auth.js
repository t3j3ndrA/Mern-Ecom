const router = require("express").Router();
const User = require("../models/User");
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
dotenv.config();

// Registe User
router.post("/register", async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	// Finding if username or email are duplicate
	try {
		const u1 = await User.findOne({ username: username });
		const u2 = await User.findOne({ email: email });
		if (u1) {
			res
				.status(200)
				.json({ success: false, msg: "This username is already in use." });
			return;
		}
		if (u2) {
			res.status(200).json({ success: false, msg: "Email is already in use." });
			return;
		}
	} catch (err) {
		res
			.status(500)
			.json({ success: false, msg: "Something really wrong in server!" });
	}

	// Adding user if no duplicate found!
	const newUser = User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY),
	});
	try {
		const savedUser = await newUser.save();
		res.status(200).json({
			success: true,
			msg: "User Registered Successfuly.",
			data: savedUser,
		});
	} catch (err) {
		res
			.status(200)
			.json({ success: false, msg: "Could not register User.", data: err });
	}
});

// Login

router.post("/login", async (req, res) => {
	const user = await User.findOne({ username: req.body.username });
	if (user) {
		const decryptedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_KEY
		).toString(CryptoJS.enc.Utf8);
		if (decryptedPassword === req.body.password) {
			const token = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.JWT_KEY,
				{ expiresIn: "3d" }
			);
			res.status(200).json({
				success: true,
				msg: "Logged in Successfully.",
				data: { ...user._doc, token },
			});
		} else res.status(200).json({ success: false, msg: "Wrong Password." });
	} else {
		res.status(200).json({ success: false, msg: "User does not exists." });
	}
});

router.post("/forget-password", async (req, res) => {
	try {
		const email = req.body.email;

		const user = await User.findOne({ email: email });

		if (!user) {
			res.json({
				success: false,
				msg: "No account registered with this e-mail.",
			});
			return;
		}

		const decryptedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_KEY
		).toString(CryptoJS.enc.Utf8);

		let fromMail = process.env.NODEMAILER_EMAIL;
		let toMail = user.email;
		let subject = "Get Urban Styles account Password";
		let body = `<h1>Urban Styles Password Reset</h1>
		<p>Hey ${user.username}, </p>
		<p>Here is your password : <b> ${decryptedPassword}</b></p>
		<p></p>
		<h3>Urban Styles</h3>
		<p>Thanks</p>`;

		let mailOptions = {
			from: fromMail,
			to: toMail,
			subject: subject,
			html: body,
		};
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: fromMail,
				pass: process.env.NODEMAILER_PASS,
			},
		});
		transporter.sendMail(mailOptions, (error, response) => {
			if (error) {
				res.json({
					success: false,
					msg: "We are facing some issue in sending you a mail.",
				});
				return;
			}
			res.json({
				success: true,
				msg: "We have sent your password to registered e-mail.",
			});
		});
	} catch (err) {
		res.json({
			success: false,
			msg: "We are facing some issue in sending you a mail.",
		});
	}
});

module.exports = router;
