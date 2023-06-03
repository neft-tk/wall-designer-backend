const { User, Design, Tile } = require('../models');

async function getDesigns(req, res) {
    try {
        const designsData = await Design.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Tile,
                }
            ]
        });
        return res.status(200).json(designsData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occured retrieving all designs' })
    };
};

async function getSingleDesign(req, res){
    try {
        const designData = await Design.findByPk(req.params.designId, {
            include: [
                {
                    model: User,
                },
                {
                    model: Tile,
                }
            ],
        });
        return res.status(200).json(designData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "an error occured retrieving a single design based on the id."})        
    };
};


// creating a design will take some time... probably gonna be an array containing an array in order to mimic a grid


module.exports = {
    getDesigns,
    getSingleDesign
}