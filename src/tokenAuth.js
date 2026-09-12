const jwt = require('jsonwebtoken');

const SECRET_KEY = "strongest_key_in_the_world_ever";

module.exports = function (req, res, next) {
	const authHeader = req.headers.authentication;
	const token = authHeader.split(" ")[1];
	if (token)
	{
		try {
			const decoded = jwt.verify(token, SECRET_KEY);
			next();
			return ;
		} catch (error) {
			res.status(403).send("Not authenticated");
			return;
		}
	}
	res.status(401).send('Authentication Required');
}
