const express = require('express');
const router = express.Router();
const userMapper = require('../data-access/userMapper');

const validateSchema = require('../services/customValidator');


//userMapper.populateTable();



// HTTP methods ↓↓ starts here.

// READ
// this api end-point of an API returns all records
router.get('/', function (req, res) {
    userMapper.getRecords().then((data) => {
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
    userMapper.getRecordById(req.params.id).then((data) => {
        console.log('got record');
        res.status(200).json(data);
    }).catch((err) => {
        res.sendStatus(404);
        console.log('Failed to get record by id. See the log:');
        console.log(err);
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
        console.log('new user saved');
        // return with status 201
        // 201 means Created. The request has been fulfilled and 
        // has resulted in one or more new resources being created. 
        res.status(201).json(newuser);
    }).catch((err) => {
        console.log('Failed to create a user. See the log:');
        console.log(err);
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
        console.log('updated');
        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    }).catch((err) => {
        console.log('Failed to update a user. See the log:');
        console.log(err);
        res.sendStatus(404);
    });
});

// DELETE
// as above
router.delete('/:id', function (req, res) {
    let newProps  = {
        isDeleted: true
    };

    userMapper.updateRecord(req.params.id, newProps).then(() => {
        console.log('deleted');
        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    }).catch((err) => {
        console.log('Failed to delete a user. See the log:');
        console.log(err);
        res.sendStatus(404);
    });
});

module.exports = router;
