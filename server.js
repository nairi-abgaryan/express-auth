const express = require("express");
const env = require("dotenv");
const { response } = require("express");
const app = express();
const mongoose = require("mongoose");

//routes
const authRoutes = require("./routes/auth");

//enviorment variables
env.config();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/usersdb',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)
.then(() => {
	app.use("/api", authRoutes);
	app.listen(process.env.PORT, () => {
		console.log("Server has started on port!", process.env.PORT)
	})
})
.catch(() => { throw new Error(("Connection error")) });

