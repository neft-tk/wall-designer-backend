const sequelize = require('../config/connection');
const { User, Design } = require('../models');

const userData = require('./userData.json');
const designData = require('./designData.json');

const seedDatabase = async () => {
    await sequelize.sync({ alter: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const designs = await Design.bulkCreate(designData);

    process.exit(0);
}

seedDatabase();