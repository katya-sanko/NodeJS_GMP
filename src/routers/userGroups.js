const express = require('express');
const router = express.Router();

const userMapper = require('../data-access/userMapper');
const groupMapper = require('../data-access/groupMapper');
const userGroupMapper = require('../data-access/userGroupMapper');

userMapper.populateTable().then(() => {
    groupMapper.bulkCreate().then(() => {
        userGroupMapper.bulkCreate();
    });
});


// HTTP GET User groups↓↓ 
router.get('/', function (req, res) {
    userGroupMapper.getRecords().then((data) => {
        console.log('got records');
        res.status(200).json(data);
    }).catch((err) => {
        console.log('Failed to get records. See the log:');
        console.log(err);
    });
});


module.exports = router;
