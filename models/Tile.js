const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');

class Tile extends Model {}

// TODO: determine if I'll use images or try to create a pattern in a different way. Probably best to just start with images and transform them from there.


Tile.init(
    {
        orientation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize
    }
)

module.exports = Tile; 