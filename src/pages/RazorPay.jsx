import axios from "axios";
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}

const displayRazorpay = async (totalAmount, cartItems, userId) => {
	const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
	let responseMsg = "";
	if (!res) {
		alert("Unable to load Payment gateway. Are you online?");
		return;
	}

	const result = await axios.post("http://localhost:5000/api/payment/orders", {
		totalAmount: totalAmount * 100,
	});

	if (!result) {
		alert("Server error. Are you online?");
		return;
	}

	const { amount, id: order_id, currency } = result.data;

	const options = {
		key: "rzp_test_F7OXBJSFPTOSkM", // Enter the Key ID generated from the Dashboard
		amount: amount.toString(),
		currency: currency,
		name: "Urban Styles",
		description: "Proceed To Payment",
		image: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX35633090.jpg",
		order_id: order_id,
		handler: async function (response) {
			const data = {
				orderCreationId: order_id,
				razorpayPaymentId: response.razorpay_payment_id,
				razorpayOrderId: response.razorpay_order_id,
				razorpaySignature: response.razorpay_signature,
			};
			cartItems = cartItems.map((item) => {
				return { productId: item._id, quantity: item.productCount };
			});
			const orderData = {
				userId: userId,
				products: cartItems,
				ammount: totalAmount,
				adress: "Gujrat, India.",
			};
			const result = await axios.post(
				"http://localhost:5000/api/payment/success",
				{ data, orderData }
			);
			responseMsg = result.data.msg;
			alert(result.data.msg);
		},

		theme: {
			color: "teal",
		},
	};

	const paymentObject = new window.Razorpay(options);
	paymentObject.open();

	return responseMsg;
};

export default displayRazorpay;
