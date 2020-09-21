const { Sequelize } = require('sequelize');

const user = require('../models/user.model');
const group = require('../models/group.model');
const userGroup = require('../models/userGroup.model');

// Passing a connection URI for postgres
const sequelize = new Sequelize('postgres://rqlfyilj:UfAPfkv30_-czBUTz8d50Q8hUw6mzDiq@balarama.db.elephantsql.com:5432/rqlfyilj');

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
                            console.log('UserGroups populated');
                        }).catch((err) => {
                            console.log('Failed to populate UserGroups');
                            console.log(err);
                        });
                    // sweet callback hell
                    }).catch((err) => {
                        console.log('Failed to clear UserGroups');
                        console.log(err);
                    });

                });

            });
            
        });

    },

    getRecords () {
        return UserGroup.findAll();
    },

    deleteRecordByGroupId (id) { // invoke this func when deleting group
        return UserGroup.destroy({ where: { groupId: id } });
    }
};

module.exports = userGroupMapper;
