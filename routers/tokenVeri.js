const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const authToken = authHeader.split(" ")[1];
		jwt.verify(authToken, process.env.JWT_KEY, (err, user) => {
			if (err) {
				res.status(401).json({ success: false, data: "Token is not Valid!" });
			}
			req.user = user;
			next();
		});
	} else {
		res.status(403).json({ success: false, data: "You are not Authorized!" });
	}
};

const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			res
				.status(403)
				.json({ success: false, data: "You are not allowed to do that" });
		}
	});
};
const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res
				.status(403)
				.json({ success: false, data: "You are not allowed to do that" });
		}
	});
};

module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
};
