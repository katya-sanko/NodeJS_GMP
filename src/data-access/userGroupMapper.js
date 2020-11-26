const logger = require('../services/customLogger');
const MODULE_NAME = 'userGroupMapper.js';

const { Sequelize } = require('sequelize');

const user = require('../models/user.model');
const group = require('../models/group.model');
const userGroup = require('../models/userGroup.model');

// Passing a connection URI for postgres
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const User = sequelize.define('User', user, {});
const Group = sequelize.define('Group', group, {});
const UserGroup = sequelize.define('UserGroup', userGroup, {});


const userGroupMapper = {

    bulkCreate () {
        let records = [];

        sequelize.sync().then(() => {
            User.findAll().then(users => {
         

                users.forEach((user) => {
                    records.push({userId: user.id});
                });

                Group.findAll().then(groups => {
               
                    records.forEach((record, index) => {
                        record.groupId = index === 0 ? groups[0].id : groups[1].id;
                    });

                    UserGroup.destroy({ truncate: true }).then(()=>{
                        UserGroup.bulkCreate(records, { validate: true }).then(() => {
                            logger.info(`[${MODULE_NAME}]: bulkCreate() invoked with params <records> ${records}`);
                        }).catch((err) => {
                            logger.error( `[${MODULE_NAME}]: bulkCreate() failed. See the log: ${err}`);
                        });
                    // sweet callback hell
                    }).catch((err) => {
                        logger.error( `[${MODULE_NAME}]: destroy() failed. See the log: ${err}`);
                    });

                });

            });
            
        });

    },

    getRecords () {
        logger.info(`[${MODULE_NAME}]: findAll() invoked without params`);
        return UserGroup.findAll();
    },

    deleteRecordByGroupId (id) { // invoke this func when deleting group
        logger.info(`[${MODULE_NAME}]: destroy() invoked with param <id> ${id}`);
        return UserGroup.destroy({ where: { groupId: id } });
    }
};

module.exports = userGroupMapper;
