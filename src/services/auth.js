const jwt = require('jsonwebtoken');
const logger = require('./customLogger');


function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    console.log(req.headers);
    const token = req.headers['authorization'];
    console.log('**************************');
    console.log(token);
    console.log('**************************');

    if (token == null) {
        logger.error('Anauthorised');
        return res.sendStatus(401);  // if there isn't any token
    }

    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            logger.error(err);
            return res.sendStatus(403); // if broken token
        }
        req.login = decoded.login;
        req.password = decoded.password;
        next();
    })
}

module.exports = authenticateToken;