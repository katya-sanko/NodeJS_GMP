const express = require('express');
const router = express.Router();
const groupMapper = require('../data-access/groupMapper');
const userGroupMapper = require('../data-access/userGroupMapper');

const validateSchema = require('../services/customValidator');


// groupMapper.bulkCreate();

// HTTP methods ↓↓ starts here.

// READ
router.get('/', function (req, res) {
    groupMapper.getRecords().then((data) => {
        console.log('get records');
        res.status(200).json(data);
    }).catch((err) => {
        console.log('Failed to get records. See the log:');
        console.log(err);
    });
});

// READ
router.get('/:id', function (req, res) {
    groupMapper.getRecordById(req.params.id).then((data) => {
        console.log('got record');
        res.status(200).json(data);
    }).catch((err) => {
        res.sendStatus(404);
        console.log('Failed to get record by id. See the log:');
        console.log(err);
    });
});

// CREATE
router.post('/', validateSchema(), function (req, res) {
    let newGroup = {
        name: req.body.name, 
        permissions: req.body.permissions
    };

    groupMapper.addRecord(newGroup).then(() => {
        console.log('new group saved');

        res.status(201).json(newGroup);
    }).catch((err) => {
        console.log('Failed to create a group. See the log:');
        console.log(err);
    });
});

// UPDATE
router.put('/:id', validateSchema(), function (req, res) {
    let record = {
        name: req.body.name, 
        permissions: req.body.permissions
    };

    groupMapper.updateRecord(req.params.id, record).then(() => {
        console.log('updated');

        res.sendStatus(204);
    }).catch((err) => {
        console.log('Failed to update a group. See the log:');
        console.log(err);
        res.sendStatus(404);
    });
});

// DELETE
// hard delete
router.delete('/:id', function (req, res) {
    let groupId = req.params.id;

    groupMapper.deleteRecord(groupId).then(() => {
        console.log('deleted');
        res.sendStatus(204);
        // so here deleting from UserGroups too
        userGroupMapper.deleteRecordByGroupId(groupId).then(()=> {
            console.log('Records from UserGroup also deleted.');
        });
    }).catch((err) => {
        console.log('Failed to delete a group. See the log:');
        console.log(err);
        res.sendStatus(404);
    });
});

module.exports = router;
