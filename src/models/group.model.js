const { DataTypes } = require('sequelize');

// Model attributes are defined here
module.exports = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: { // 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
};

