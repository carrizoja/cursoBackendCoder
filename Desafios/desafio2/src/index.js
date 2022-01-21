const ProductManager = require('./productManager.js')

const productService = new ProductManager();

let product = {
    title: "Motherboard Asus Z490 Wifi TUF",
    price: 30000,
    thumbnail: "https://res.cloudinary.com/ijac-it-solutions/image/upload/v1639593041/img/asus_tuf_wifi_gseius.png"

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