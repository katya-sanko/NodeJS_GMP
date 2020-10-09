const express = require('express');
const router = express.Router();

const logger = require('../services/customLogger');
const MODULE_NAME = 'userGroups.js';

const userMapper = require('../data-access/userMapper');
const groupMapper = require('../data-access/groupMapper');
const userGroupMapper = require('../data-access/userGroupMapper');

userMapper.populateTable().then(() => {
    groupMapper.bulkCreate().then(() => {
        userGroupMapper.bulkCreate();
    });
});


// HTTP GET UserGroups↓↓ 
router.get('/', function (req, res) {
    userGroupMapper.getRecords().then((data) => {
        res.status(200).json(data);
        logger.info(`[${MODULE_NAME}]: getRecords() invoked without params`);
    }).catch((err) => {
        logger.error( `[${MODULE_NAME}]: Failed to get records. See the log: ${err}`);
    });
});


module.exports = router;
