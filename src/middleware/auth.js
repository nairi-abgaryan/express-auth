const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
	try {
		const token = req.header.authorization.split("")[1];
		const isCustomAuth = token.length < 500;

		let decodeData;
		if (token && isCustomAuth) {
			decodeData = jwt.verify(token, process.env.JWT_SECRET);
			req.UserId = decodeData?.id;
		} else {
			decodeData = jwt.decode(token);
			req.UserId = decodeData?.sub;
		}
		next();
	} catch (error) {}
};

exports.userMiddleware = (req, res, next) => {
	if (req.user.role !== "user") {
		return res.status(400).json({ message: "User access denied" });
	}
	next();
};

exports.adminMiddleware = (req, res, next) => {
	if (req.user.role !== "admin") {
		return res.status(400).json({ message: "Access denied" });
	}
	next();
};
