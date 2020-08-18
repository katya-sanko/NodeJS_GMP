// import required essentials
const express = require('express');
// create new router
const router = express.Router();
// create a JSON data array
let data = [
    { id: '0', login: 'Latte',  password: 'latte1', age: 34, isDeleted: false },
    { id: '1', login: 'Cappuccino',  password: 'cappuccino1', age: 30, isDeleted: false },
    { id: '2', login: 'Americano',  password: 'americano1', age: 27, isDeleted: false },
    { id: '3', login: 'Espresso',  password: 'espresso1', age: 35, isDeleted: false },
    { id: '4', login: 'Doppio',  password: 'doppio1', age: 22, isDeleted: false }
];

// HTTP methods ↓↓ starts here.

// READ
// this api end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (user) {
        return user.id === req.params.id;
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
// this api end-point add new object to user list
// that is add new object to `data` array
router.post('/', function (req, res) {
    // get userIds from data array
    let userIds = data.map(user => user.id);

    // create new id (basically +1 of last user object)
    let newId = data.length.toString();

    // create an object of new user
    let newuser = {
        id: newId, // generated in above step
        login: req.body.login, // value of `login` get from POST req
        password: req.body.password, // value of `password` get from POST req
        age: parseInt(req.body.age), // value of `age` get from POST req
        isDeleted: false // default value is set to false
    };

    // push new user object to data array of users
    data.push(newuser);

    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    res.status(201).json(newuser);
});

// UPDATE
// this api end-point update an existing user object
// for that we get `id` and `login` from api end-point of user to update
router.put('/:id', function (req, res) {
    // get user object match by `id`
    let found = data.find(function (user) {
        return user.id === req.params.id;
    });

    // check if user found
    if (found) {
        let updated = {
            id: found.id,
            login: req.body.login, // set value of `login` get from req
            password: req.body.password, // set value of `password` get from req
            age: parseInt(req.body.age), // set value of `age` get from req
            isDeleted: req.body.deleted // set value of `deleted` get from req
        };

        // find index of found object from array of data
        let targetIndex = data.indexOf(found);

        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
// this api end-point delete an existing user object from
// array of data, match by `id` find user and then delete
router.delete('/:id', function (req, res) {
    // find user from array of data
    let found = data.find(function (user) {
        return user.id === req.params.id;
    });

    if (found) {
        // if user found then find index at which the user is
        // stored in the `data` array
        let targetIndex = data.indexOf(found);

        // splice means delete user from `data` array using index
        data[targetIndex].isDeleted = true;
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
});

// module.exports is an object included in every JS file of Node.js
// application, whatever we assign to module.exports will be exposed as a module. 
module.exports = router;
