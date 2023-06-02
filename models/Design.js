const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Design extends Model {}

Design.init(
    {
        designName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize
    }
);

module.exports = Design;