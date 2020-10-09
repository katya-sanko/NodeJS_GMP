const express = require('express');
const router = express.Router();
const userMapper = require('../data-access/userMapper');

const validateSchema = require('../services/customValidator');
const logger = require('../services/customLogger');
const MODULE_NAME = 'users.js';

// HTTP methods ↓↓ starts here.

// READ
// this api end-point of an API returns all records
router.get('/', function (req, res) {
    userMapper.getRecords().then((data) => {
        res.status(200).json(data);
        logger.info(`[${MODULE_NAME}]: getRecords() invoked without params`);
    }).catch((err) => {
        logger.error( `[${MODULE_NAME}]: Failed to get records. See the log: ${err}`);
    });
});

// READ
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    userMapper.getRecordById(req.params.id).then((data) => {
        res.status(200).json(data);
        logger.info(`[${MODULE_NAME}]: getRecordById() invoked with param <id> ${req.params.id}`);
    }).catch((err) => {
        res.sendStatus(404);
        logger.error( `[${MODULE_NAME}]: Failed to get record by id. See the log: ${err}`);
    });
});

// CREATE
// this api end-point add new record to user table
router.post('/', validateSchema(), function (req, res) {
    let newuser = {
        login: req.body.login, // value of `login` get from POST req
        password: req.body.password, // value of `password` get from POST req
        age: parseInt(req.body.age), // value of `age` get from POST req
        isDeleted: false // default value is set to false
    };

    userMapper.addRecord(newuser).then(() => {
        // return with status 201 which means Created. The request has been fulfilled and 
        // has resulted in one or more new resources being created. 
        res.status(201).json(newuser);
        logger.info(`[${MODULE_NAME}]: addRecord() invoked with param <newuser> ${newuser}`);
    }).catch((err) => {
        logger.error( `[${MODULE_NAME}]: Failed to create a user. See the log: ${err}`);
    });
});

// UPDATE
// this api end-point update an existing user record
router.put('/:id', validateSchema(), function (req, res) {
    let record = {
        login: req.body.login, // set value of `login` get from req
        password: req.body.password, // set value of `password` get from req
        age: parseInt(req.body.age), // set value of `age` get from req
        isDeleted: req.body.isDeleted // set value of `isDeleted` get from req
    };

    userMapper.updateRecord(req.params.id, record).then(() => {
        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
        logger.info(`[${MODULE_NAME}]: updateRecord() invoked with params <id> ${req.params.id} <record> ${record}`);
    }).catch((err) => {
        res.sendStatus(404);
        logger.error( `[${MODULE_NAME}]: Failed to update a user. See the log: ${err}`);
    });
});

// DELETE
// as above
router.delete('/:id', function (req, res) {
    let newProps  = {
        isDeleted: true
    };

    userMapper.updateRecord(req.params.id, newProps).then(() => {
        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
        logger.info(`[${MODULE_NAME}]: updateRecord() invoked with params <id> ${req.params.id} <newProps> ${newProps}`);
    }).catch((err) => {
        res.sendStatus(404);
        logger.error( `[${MODULE_NAME}]: Failed to mark user as deleted. See the log: ${err}`);
    });
});

module.exports = router;
