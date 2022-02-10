const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.get("/", (req, res) => {
	res.send("Working properly!");
});
app.use(express.json());
const users = [
	{
		id: "1",
		username: "tej",
		isAdmin: false,
	},
	{
		id: "2",
		username: "dhara",
		isAdmin: false,
	},
];

app.post("/auth/login", (req, res) => {
	const username = req.body.username;
	const user = users.find((u) => u.username === username);
	if (user) {
		const authToken = jwt.sign(
			{ id: user.id, isAdmin: user.isAdmin },
			"secret"
		);
		res.json({
			username: user.username,
			isAdmin: user.isAdmin,
			authToken: authToken,
		});
	} else {
		res.status(403).json("User not found!");
	}
});

const verifyToken = (req, res, next) => {
	const authToken = req.headers.authorization.split(" ")[1];
	console.log(authToken);
	if (authToken) {
		jwt.verify(authToken, "secret", (err, user) => {
			if (err) {
				console.log("there is an error!");
				return res.status(401).json("token is not valid");
			} else {
				console.log(user);
				req.user = user;
				next();
			}
		});
	} else {
		res.status(403).json("You are not authorized!");
	}
	next();
};

app.delete("/delete/:userId", verifyToken, (req, res) => {
	const userId = req.params.userId;
	if (req.user.id == userId) {
		res.json("deleted!");
	} else {
		res.json("you cannot delete this user!");
	}
});

app.listen(5000, () => console.log("serve is running!"));
