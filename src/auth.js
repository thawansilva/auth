const base64 = require('base-64')

function decodeCredentials(encoded) {
	if (encoded == '')
		return [];
	const encode = encoded.split(' ')[1];
	return base64.decode(encode).split(':');
}

module.exports = function (req, res, next) {
	const [username, password] = decodeCredentials(req.headers.authorization || "");
	
	if (username == 'admin' && password == 'admin')
	{
		next();
		return;
	}
	res.set('WWW-Authenticate', 'Basic realm="user_pages"');
	res.status(401).send('Authentication Required');
}
