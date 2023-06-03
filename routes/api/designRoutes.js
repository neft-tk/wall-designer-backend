const router = require('express').Router();

const {
    getDesigns,
    getSingleDesign,
} = require('../../controllers/designController');


router.route('/')
.get(getDesigns);

// @ api/designs/:designId
router.route('/:designId')
.get(getSingleDesign);

module.exports = router;