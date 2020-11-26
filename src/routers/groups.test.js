const supertest = require('supertest');
const express = require('express');
const groupsRouter = require('./groups');
const groupMapper = require('../data-access/groupMapper');

const logger = require('../services/customLogger');
jest.mock('../services/customLogger');


describe('Groups', () => {
    let request;
    let response;

    beforeAll(() => {
        const app = express();
        app.use(express.json());
        app.use('/groups', groupsRouter);
        request = supertest(app);
    });

    it('GET / should return groups and status code 200', async done => {
        spyOn(groupMapper, 'getRecords').and.returnValue(Promise.resolve([]));
        response = await request
            .get('/groups');

        expect(groupMapper.getRecords).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(Array.isArray(JSON.parse(response.text))).toBe(true);
        done();
    });

    it('GET /:id should return group by id', async done => {
        const id = 'id';
        const group = {};
        spyOn(groupMapper, 'getRecordById').and.returnValue(Promise.resolve(group));
        response = await request
            .get(`/groups/${id}`);

        expect(groupMapper.getRecordById).toHaveBeenCalledWith(id);
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toEqual(group);
        done();
    });

    it('POST / should return 201 on success', async done => {
        const body = { name: 'Test', permissions: [] };
        spyOn(groupMapper, 'addRecord').and.returnValue(Promise.resolve(body));
        response = await request
            .post('/groups/')
            .send(body)
            .set('Content-Type', 'application/json');

        expect(groupMapper.addRecord).toHaveBeenCalledWith(body);
        expect(response.status).toBe(201);
        expect(JSON.parse(response.text)).toEqual(body);
        done();
    });

    it('PUT /:id should return 204 on success', async done => {
        const id = 'id';

        const body = { name: 'Test', permissions: [] };
        spyOn(groupMapper, 'updateRecord').and.returnValue(Promise.resolve(body));
        response = await request
            .put(`/groups/${id}`)
            .send(body)
            .set('Content-Type', 'application/json');

        expect(groupMapper.updateRecord).toHaveBeenCalledWith(id, body);
        expect(response.status).toBe(204);
        done();
    });

    it('DELETE /:id should return 204 on success', async done => {
        const id = 'id';
        spyOn(groupMapper, 'deleteRecord').and.returnValue(Promise.resolve());
        response = await request
            .delete(`/groups/${id}`);
        expect(response.status).toBe(204);
        expect(groupMapper.deleteRecord).toHaveBeenCalledWith(id);
        done();
    });
});
