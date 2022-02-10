const router = require("express").Router();
const Product = require("../models/Product");
const {
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./tokenVeri");

// add product
router.post("/add", verifyTokenAndAdmin, async (req, res) => {
	const { title, desc, categories, img, size, color, price } = req.body;
	try {
		const newProduct = await new Product({
			title,
			desc,
			categories,
			img,
			size,
			color,
			price,
		});
		const savedProduct = await newProduct.save();
		res.status(200).json({
			success: true,
			data: {
				msg: `Product : ${title} addedd succesfuly!`,
				product: savedProduct,
			},
		});
	} catch (err) {
		res.status(500).json({ success: false, data: err });
	}
});

// Update product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: { msg: "Product updated Successfuly!", product: updatedProduct },
		});
	} catch (err) {
		res.status(403).json({ success: false, data: "You are not authorized" });
	}
});

// Delete Product

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.json({ success: true, data: { msg: "Product deleted Successfuly!" } });
	} catch (err) {
		res.json({ success: false, data: { msg: "Could not find the Product" } });
	}
});

// ! Get Single Product

router.get("/find/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res
			.status(200)
			.json({ success: true, data: { msg: "Product found!", product } });
	} catch (err) {
		res.status(200).json({
			success: false,
			data: { msg: "Something wrong in server! Could not find the Product" },
		});
	}
});

// ! Get all Products + Query Supported

router.get("/", async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let products;
		if (qNew && qCategory) {
			products = await Product.find({ categories: { $in: [qCategory] } })
				.sort({ createdAt: -1 })
				.limit(1);
		} else if (qNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			products = await Product.find({ categories: { $in: [qCategory] } });
		} else {
			products = await Product.find();
		}
		res
			.status(200)
			.json({ success: true, data: { msg: "Products found!", products } });
	} catch (err) {
		res.status(401).json({
			success: false,
			data: { msg: "Something wrong in server! Could not find Products" },
		});
	}
});

module.exports = router;
