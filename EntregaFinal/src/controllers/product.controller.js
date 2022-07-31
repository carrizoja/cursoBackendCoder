const service = require('../services/product.service');

const getProducts = async(req, res) => {
    try {
        const response = await service.getAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const getProductsByCategory = async(req, res) => {
    try {
        const category = req.params.category;
        await service.getByCategory(category).then(result => {
            if (result.length == 0) {
                return res.status(404).send({ error: "Product not found" });
            }
            res.json(result);
        })
    } catch (error) {
        console.log(error);
    }
}

const postProduct = async(req, res) => {
    console.log(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) return res.status(400).send({ error: "There isn't any data" });

    try {
        const product = req.body;
        if (product.hasOwnProperty('name')) {
            if (product.name == "") {
                return res.status(500).send({ error: "There isn't a name for the product. Please insert a name" })
            }
        }
        if (product.hasOwnProperty('price')) {
            let price = parseInt(product.price);
            if (isNaN(price)) {
                return res.status(400).send({ error: "Not a valid number for price" })
            }
        }
        if (product.hasOwnProperty('thumbnail')) {
            if (product.name == "") {
                return res.status(500).send({ error: "There isn't a name for the product. Please insert a name" })
            }
        }
        await service.save(product).then(result => { res.json(result); });
    } catch (error) {
        console.log(error);
    }
};

const putProduct = async(req, res) => {
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) return res.status(400).send({ error: "There isn't any data" });
        const product = req.body;
        const id = req.params.id;

        if (product.hasOwnProperty('name')) {
            if (product.name == "") {
                return res.status(500).send({ error: "There isn't a name for the product. Please insert a name" })
            }
        }
        if (product.hasOwnProperty('price')) {
            let price = parseInt(product.price);
            if (isNaN(price)) {
                return res.status(400).send({ error: "Not a valid number for price" })
            }
        }
        if (product.hasOwnProperty('thumbnail')) {
            if (product.name == "") {
                return res.status(500).send({ error: "There isn't a name for the product. Please insert a name" })
            }
        }

        await service.update(id, product).then(result => { res.json(result); });
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async(req, res) => {
    try {
        const id = req.params.id;
        await service.deleteById(id).then(result => { res.json(result); });
    } catch (error) {
        console.log(error);
    }
};

const getProductById = async(req, res) => {
    try {
        const id = req.params.id;
        await service.getById(id).then(result => {
            if (result.id == null) {
                return res.status(404).send({ error: "Product not found" });
            }
            res.json(result);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory
};