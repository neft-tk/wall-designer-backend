const router = require('express').Router();
const userRoutes = require('./userRoutes');
const designRoutes = require('./designRoutes');

router.use('/users', userRoutes);
router.use('/designs', designRoutes);


module.exports = router;