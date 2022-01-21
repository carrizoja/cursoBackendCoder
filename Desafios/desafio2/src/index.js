const ProductManager = require('./productManager.js')

const productService = new ProductManager();

let product = {
    title: "Micro intel i9 11th",
    price: 120000,
    thumbnail: "https://res.cloudinary.com/ijac-it-solutions/image/upload/v1639592180/img/intel_i9_11th_rkievv.jpg"

}

// Create Object
productService.createProduct(product).then(result => console.log(result));

// getById
//productService.findById(1).then(result => console.log(result));

//GetAll
//productService.findAll().then(result => console.log(result));

// DeleteById
//productService.deleteProduct(2).then(result => console.log(result));

// DeleteAllObjects
//productService.deleteAllProducts().then(result => console.log(result));