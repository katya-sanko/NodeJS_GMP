const express = require('express');
const router = express.Router();
const groupMapper = require('../data-access/groupMapper');

const validateSchema = require('../services/customValidator');


groupMapper.bulkCreate();

// HTTP methods ↓↓ starts here.

// READ
// this api end-point of an API returns all records
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
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points
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
// this api end-point add new record to group table
router.post('/', validateSchema(), function (req, res) {
    let newGroup = {
        name: req.body.name, 
        permissions: req.body.permissions
    };

    groupMapper.addRecord(newGroup).then(() => {
        console.log('new group saved');
        // return with status 201
        // 201 means Created. The request has been fulfilled and 
        // has resulted in one or more new resources being created. 
        res.status(201).json(newGroup);
    }).catch((err) => {
        console.log('Failed to create a group. See the log:');
        console.log(err);
    });
});

// UPDATE
// this api end-point update an existing group record
router.put('/:id', validateSchema(), function (req, res) {
    let record = {
        name: req.body.name, 
        permissions: req.body.permissions
    };

    groupMapper.updateRecord(req.params.id, record).then(() => {
        console.log('updated');
        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    }).catch((err) => {
        console.log('Failed to update a group. See the log:');
        console.log(err);
        res.sendStatus(404);
    });
});

// DELETE
// as above
router.delete('/:id', function (req, res) {
    groupMapper.deleteRecord(req.params.id).then(() => {
        console.log('deleted');
        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    }).catch((err) => {
        console.log('Failed to delete a group. See the log:');
        console.log(err);
        res.sendStatus(404);
    });
});

module.exports = router;
