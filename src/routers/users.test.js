const supertest = require('supertest');
const express = require('express');
const usersRouter = require('./users');
const userMapper = require('../data-access/userMapper');

const logger = require('../services/customLogger');
jest.mock('../services/customLogger');


describe('users', () => {
    let request;
    let response;

    beforeAll(() => {
        const app = express();
        app.use(express.json());
        app.use('/users', usersRouter);
        request = supertest(app);
    });

    it('GET / should return users and status code 200', async done => {
        spyOn(userMapper, 'getRecords').and.returnValue(Promise.resolve([]));
        response = await request
            .get('/users');

        expect(userMapper.getRecords).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(Array.isArray(JSON.parse(response.text))).toBe(true);
        done();
    });

    it('GET /:id should return user by id', async done => {
        const id = 'id';
        const user = {};
        spyOn(userMapper, 'getRecordById').and.returnValue(Promise.resolve(user));
        response = await request
            .get(`/users/${id}`);

        expect(userMapper.getRecordById).toHaveBeenCalledWith(id);
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toEqual(user);
        done();
    });

    it('POST / should return 201 on success', async done => {
        const body = {
            login: 'Mokko',
            password: 'Mokko1',
            age: 90,
            isDeleted: false
        };
        spyOn(userMapper, 'addRecord').and.returnValue(Promise.resolve(body));
        response = await request
            .post('/users/')
            .send(body)
            .set('Content-Type', 'application/json');

        expect(userMapper.addRecord).toHaveBeenCalledWith(body);
        expect(response.status).toBe(201);
        expect(JSON.parse(response.text)).toEqual(body);
        done();
    });

    it('PUT /:id should return 204 on success', async done => {
        const id = 'id';

        const body = {
            login: 'Mokko',
            password: 'Mokko1',
            age: 90,
            isDeleted: false
        };
        spyOn(userMapper, 'updateRecord').and.returnValue(Promise.resolve(body));
        response = await request
            .put(`/users/${id}`)
            .send(body)
            .set('Content-Type', 'application/json');

        expect(userMapper.updateRecord).toHaveBeenCalledWith(id, body);
        expect(response.status).toBe(204);
        done();
    });

    it('POST /:id should return 204 on success', async done => {
        const id = 'id';
        spyOn(userMapper, 'updateRecord').and.returnValue(Promise.resolve());
        response = await request
            .delete(`/users/${id}`);
        expect(response.status).toBe(204);
        expect(userMapper.updateRecord).toHaveBeenCalledWith(id, {isDeleted: true});
        done();
    });
});
