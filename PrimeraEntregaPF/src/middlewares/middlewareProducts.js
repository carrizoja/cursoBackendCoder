const { request, response } = require('express');

// Variable para Administradores
const admin = true;

const middlewareAuth = (req = request, res = response, next) => {
    if (!admin) {
        res.status(400).send({ message: "Forbidden Path", description: 'route /products unauthorized post method. You are not an Admin' })
    } else {
        next();
    }
}

module.exports = { middlewareAuth }