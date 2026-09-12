const express = require('express');
const bcrypt = require('bcrypt');
// const authMiddleware = require('./auth'); basic auth
const authMiddleware = require('./tokenAuth');
const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json());

module.exports = users = [{ name: "Thawan", password: "$2b$10$HKED2i7whRjgH.6iTTF5COxDhQbnPgIrSh0DdlTXEKuafiM9.DWVq" }];

const SECRET_KEY = "strongest_key_in_the_world_ever";

app.post("/login", async (req, res) => {
	const {username, password } = req.body
	if (!username || !password)
		res.status(400)
			 .json({ status: "fail", message: "You should sent the credentials"});
	let token;

	const user = users.find(u => u.name == username);
	if (user) {
		const isPassword = await bcrypt.compare(password, user.password);
		if (!isPassword)
		{
			res.status(404).json({ status: "fail", message: `Invalid credentials`});
			return;
		}
		const payload = { name: username };
		token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256" });
		res.status(200).json({ status: "success", message: "User found", data: { token }});
		return;
	}
	res.status(404).send("Invalid credentials");
});

app.post("/register", async (req, res) => {
	const { username, password } = req.body

	if (!username || !password)
		res.status(400)
		 .json({ status: "fail",
			 message: "You should sent the username and password for register"});

	const user = users.find(u => u.name == username);
	if (user)
	{
		res.status(409).json({ status: "fail", data: "user already exists" });
		return;
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	users.push({ name: username, password: hashedPassword });
	res.status(201).json({
		status: "success",
		data: { username }
	});
});

app.get("/home", authMiddleware, (req, res) => {
	res.status(200)
		.send("<html><head><title>Small api</title></head><body>hello world</body></html>");
});

app.listen(8000, () => {
	console.log(`server is running on port ${8000}`);
});
