const productAxios = require("./ProductAxios");
const separator = `\n${'-'.repeat(80)}\n`;

const getProducts = async() => {
    const products = await productAxios.getAllProducts();
    console.log(`${separator}-HTTP-CLIENT -> Method: GET ${products}${separator}`);
}

const postProduct = async() => {

    const product = {
        name: "Test Product 2",
        price: 200,
        thumbnail: "https://via.placeholder.com/150",
    }
    const productPost = await productAxios.postProduct(product);
    console.log(`${separator}-HTTP-CLIENT -> Method: POST ${separator}`, productPost);
}

const putProduct = async() => {
    const product = {
        name: "Test Product",
        price: 100,
        thumbnail: "https://via.placeholder.com/150",
    }
    const productPut = await productAxios.putProduct(1, product);
    console.log(`${separator}-HTTP-CLIENT -> Method: PUT ${productPut}${separator}`);
}

const deleteProduct = async() => {
    const productToDelete = {
        id: 1,
    }
    const productDelete = await productAxios.deleteProduct(productToDelete.id);
    console.log(`${separator}-HTTP-CLIENT -> Method: DELETE ${productDelete}${separator}`);
}

//getProducts();
postProduct();
//putProduct();
//deleteProduct();