const User = require('./User');
const Design = require('./Design');
const Tile = require('./Tile');

// TODO: not sure if I need Tiles to have a belongsToMany relationship back to Designs. Tiles will mainly be uniquely created pieces of data that have their attributes pulled when called by the front-end.


// A User can have many designs
User.hasMany(Design,{
    onDelete: 'CASCADE'
});

// A Design belongs to a User
Design.belongsTo(User);

// A Design is comprised of tiles
// Design.belongsToMany(Tile, {
//     through: "DesignPattern"
// });

// Tiles can belong to many designs
// Tile.belongsToMany(Design, {
//     through: "DesignPattern"
// });

module.exports = { User, Design, Tile };