const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return res.status(400).json({ message: "User does not exists." });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid credentials." });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: "3d" }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

exports.signupUser = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: "User already exists." });
		if (!password === confirmPassword)
			return res.status(400).json({ message: "Password don't match" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			firstName,
			lastName,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			process.env.JWT_SECRET,
			{ expiresIn: "3d" }
		);

		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
