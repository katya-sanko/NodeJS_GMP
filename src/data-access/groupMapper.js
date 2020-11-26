const logger = require('../services/customLogger');
const MODULE_NAME = 'groupMapper.js';

const { Sequelize } = require('sequelize');
const group = require('../models/group.model');

// Passing a connection URI for postgres
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const Group = sequelize.define('Group', group, {});

const groupMapper = {

    bulkCreate () {
        let groups = [
            { name: 'Admin', permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] },
            { name: 'Optimist', permissions: ['READ'] },
            { name: 'Pessimist', permissions: [] }
        ];

        return sequelize.sync({ force: true }).then(() => {
            Group.bulkCreate(groups, { validate: true }).then(() => {
                logger.info(`[${MODULE_NAME}]: bulkCreate() invoked with params <groups> ${groups}`);
            }).catch((err) => {
                logger.error( `[${MODULE_NAME}]: bulkCreate() failed. See the log: ${err}`);
            });
        });

    },

    getRecords () {
        logger.info(`[${MODULE_NAME}]: findAll() invoked without params`);
        return Group.findAll();
    },

    getRecordById (id) {
        logger.info(`[${MODULE_NAME}]: findOne() invoked with param <id> ${id}`);
        return Group.findOne({ where: { id: id } });
    },

    addRecord (newGroup) {
        logger.info(`[${MODULE_NAME}]: create() invoked with param <newGroup> ${newGroup}`);
        return Group.create(newGroup);
    },

    updateRecord (id, newProps) {
        logger.info(`[${MODULE_NAME}]: update() invoked with params <id> ${id} <newProps> ${newProps}`);
        return Group.update(newProps, { where: { id: id } });
    },

    deleteRecord (id) {
        logger.info(`[${MODULE_NAME}]: destroy() invoked with param <id> ${id}`);
        return Group.destroy({ where: { id: id } });
    }
};

module.exports = groupMapper;
