const router = require("express").Router();
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const User = require("../models/User");
const nodemailer = require("nodemailer");
router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET,
		});

		const options = {
			amount: req.body.totalAmount, // amount in smallest currency unit
			currency: "INR",
		};
		const order = await instance.orders.create(options);
		if (!order) return res.status(500).send("Some error occured");
		res.json(order);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/success", async (req, res) => {
	const newOrder = Order(req.body.orderData);
	try {
		const userId = req.body.orderData.userId;
		const savedOrder = await newOrder.save();
		const user = await User.findById(userId);

		const d = new Date(savedOrder.createdAt);

		let fromMail = process.env.NODEMAILER_EMAIL;
		let toMail = user.email;
		let subject = "ORDER details Urban Styles";

		let body = `<h1>Order Details</h1>
		<p>Hey ${user.username}, </p>
		<p>You Order is done successfuly and it is on its way.</p>
		<p>
		It will be delivered in 5 working days. It might get delayed due to Corona pandemic and new guidelines. We are always trying our best to deliver you as soon as possible. Thankyou for your coperations.
		</p>
		<p> </p>
		<center>
			<table border="1" cellspacing="0" cellpadding="10" align="center"> 
				<tr> 
					<td><b>Order</b></td>
					<td><b>Details</b></td>
				</tr>
				<tr> 
					<td>ID</td>
					<td><b> ${savedOrder._id}</b></td>
				</tr>
				<tr> 
					<td>Status</td>
					<td><b> ${savedOrder.status}</b></td>
				</tr>
				<tr> 
					<td>Date</td>
					<td><b> ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} </b></td>
				</tr>
				<tr> 
					<td>Time</td>
					<td><b>${d.getHours()} : ${d.getMinutes()}<b></td>
				</tr>
				<tr> 
					<td>Total Amount</td>
					<td><b>₹ ${savedOrder.ammount}</b></td>
				</tr>
				<tr> 
					<td>Paid Amount</td>
					<td><b>₹ ${savedOrder.ammount} </b></td>
				</tr>
				<tr> 
					<td>Remaining Amount</td>
					<td><b>₹ 0<b></td>
				</tr>
				<tr> 
					<td>Payment Mode</td>
					<td><b>Online Payment</b></td>
				</tr>
			</table>
			
		</center>
		
		<p> You can use your Order ID to track your order. </p>
		<p> </p>
		<hr/>
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
				msg: "We have sent your ORDER details to registered e-mail.",
			});
		});
	} catch (err) {
		res.json({ msg: "Something wrong with server!" });
	}
});

module.exports = router;

{
	/* <p>Here is your Order ID : <b> ${savedOrder._id}</b></p>
<p>You can use this ID to track your product.</p>
<p>Order Status : <b> ${savedOrder.status}</b></p>
<p>Ordered Data : <b> ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} </b> </p>
<p>Ordered Time : <b> ${d.getHours()} : ${d.getMinutes()} </b> </p>
<p>Order Ammount : <b> ₹ ${savedOrder.ammount}</b></p>
<p></p> */
}
