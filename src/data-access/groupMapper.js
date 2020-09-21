const { Sequelize } = require('sequelize');
const group = require('../models/group.model');

// Passing a connection URI for postgres
const sequelize = new Sequelize('postgres://rqlfyilj:UfAPfkv30_-czBUTz8d50Q8hUw6mzDiq@balarama.db.elephantsql.com:5432/rqlfyilj');

const Group = sequelize.define('Group', group, {
    // Other model options go here
});


const groupMapper = {

    bulkCreate () {
        let groups = [
            { name: 'Admin', permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] },
            { name: 'Optimist', permissions: ['READ'] },
            { name: 'Pessimist', permissions: [] }
        ];

        return sequelize.sync({ force: true }).then(() => {
            Group.bulkCreate(groups, { validate: true }).then(() => {
                console.log('Groups populated');
            }).catch((err) => {
                console.log('Failed to populate Groups');
                console.log(err);
            }).finally(() => {
                // sequelize.close();
            });
        });

    },

    getRecords () {
        return Group.findAll();
    },

    getRecordById (id) {
        return Group.findOne({ where: { id: id } });
    },

    addRecord (newGroup) {
        return Group.create(newGroup);
    },

    updateRecord (id, newProps) {
        return Group.update(newProps, { where: { id: id } });
    },

    deleteRecord (id) {
        return Group.destroy({ where: { id: id } });
    }
};

module.exports = groupMapper;
