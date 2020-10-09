const express = require('express');
const router = express.Router();
const groupMapper = require('../data-access/groupMapper');
const userGroupMapper = require('../data-access/userGroupMapper');

const validateSchema = require('../services/customValidator');
const logger = require('../services/customLogger');
const MODULE_NAME = 'groups.js';

// groupMapper.bulkCreate();

// HTTP methods ↓↓ starts here.

// READ
router.get('/', function (req, res) {
    groupMapper.getRecords().then((data) => {
        res.status(200).json(data);
        logger.info(`[${MODULE_NAME}]: getRecords() invoked without params`);
    }).catch((err) => {
        logger.error( `[${MODULE_NAME}]: Failed to get records. See the log: ${err}`);
    });
});

// READ
router.get('/:id', function (req, res) {
    groupMapper.getRecordById(req.params.id).then((data) => {
        res.status(200).json(data);
        logger.info(`[${MODULE_NAME}]: getRecordById() invoked with param <id> ${req.params.id}`);
    }).catch((err) => {
        res.sendStatus(404);
        logger.error( `[${MODULE_NAME}]: Failed to get record by id. See the log: ${err}`);
    });
});

// CREATE
router.post('/', validateSchema(), function (req, res) {
    let newGroup = {
        name: req.body.name, 
        permissions: req.body.permissions
    };

    groupMapper.addRecord(newGroup).then(() => {
        res.status(201).json(newGroup);
        logger.info(`[${MODULE_NAME}]: addRecord() invoked with param <newGroup> ${newGroup}`);
    }).catch((err) => {
        logger.error( `[${MODULE_NAME}]: Failed to create a group. See the log: ${err}`);
    });
});

// UPDATE
router.put('/:id', validateSchema(), function (req, res) {
    let record = {
        name: req.body.name, 
        permissions: req.body.permissions
    };

    groupMapper.updateRecord(req.params.id, record).then(() => {
        res.sendStatus(204);
        logger.info(`[${MODULE_NAME}]: updateRecord() invoked with params <id> ${req.params.id} <record> ${record}`);
    }).catch((err) => {
        res.sendStatus(404);
        logger.error( `[${MODULE_NAME}]: Failed to update a group. See the log: ${err}`);
    });
});

// DELETE
// hard delete
router.delete('/:id', function (req, res) {
    let groupId = req.params.id;

    groupMapper.deleteRecord(groupId).then(() => {
        res.sendStatus(204);
        logger.info(`[${MODULE_NAME}]: deleteRecord() invoked with param <groupId> ${groupId}`);
        userGroupMapper.deleteRecordByGroupId(groupId).then(()=> {
            logger.info(`[${MODULE_NAME}]: deleteRecordByGroupId() invoked with param <groupId> ${groupId}`);
        });
    }).catch((err) => {
        res.sendStatus(404);
        logger.error( `[${MODULE_NAME}]: Failed to delete a group. See the log: ${err}`);
    });
});

module.exports = router;
