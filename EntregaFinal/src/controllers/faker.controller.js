const serviceFaker = require('../services/faker');


const getProducts_test = (req, res) => {
    try {
        const arrayRandomProducts = serviceFaker.generateFakerProducts();
        res.json(arrayRandomProducts);
        /*   res.json({ arrayRandomProducts }); */
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getProducts_test }