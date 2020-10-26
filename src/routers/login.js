const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userMapper = require('../data-access/userMapper');
const logger = require('../services/customLogger');


router.post('/', function (req, res) { // login method
    let login = req.body.login;
    let password = req.body.password;

    userMapper.getRecordForAuth(login, password).then((data) => {
        if (data && data.dataValues) {
            let payload = { 'sub': data.dataValues.id, 'isDeleted': data.dataValues.isDeleted };
            let token = jwt.sign(payload, 'secret', { expiresIn: 1800 });
            res.send(token);
            logger.info(`Returned token: ${token}`);
        }
        else {
            logger.error('User not exist');
            res.status(403).send();
        }
    }).catch((err) => {
        logger.error(`Failed to login. See the log: ${err}`);
    });

});

module.exports = router;
