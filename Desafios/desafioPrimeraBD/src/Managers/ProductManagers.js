const options = require('../options/mysqlconfig.js')
const knex = require('knex');
const database = knex(options);

class ProductManager {

    getAll = async() => {
        let tableExists = await database.schema.hasTable('products');
        if (tableExists) {
            let products = await database.from('products').select('*')
            return { status: "success", payload: products }
        }

    }



    add = async(product) => {
        let tableExists = await database.schema.hasTable('products');
        if (tableExists) {
            await database('products').insert(product);
            return { status: "success", message: "Product added" }
        }

    }

    deleteProduct = async(id) => {
        if (!id) return { status: "error", error: "ID needed" }
        let tableExists = await database.schema.hasTable('products');
        if (tableExists) {
            await database.from('products').where('id', id).del();
            return { status: "success", message: "Product deleted" }
        }

    }

    updateProduct = async(id, updatedProduct) => {

        if (!id) return { status: "error", error: "ID needed" }
        if (updatedProduct.hasOwnProperty('name')) {
            await database.from('products').where('id', id).update({ name: updatedProduct.name })
            return { status: "success", message: "Product updated" }
        }
        if (updatedProduct.hasOwnProperty('price')) {
            await database.from('products').where('id', id).update({ price: updatedProduct.price })
            return { status: "success", message: "Product updated" }
        }
        if (product.hasOwnProperty('thumbnail')) {
            await database.from('products').where('id', id).update({ thumbnail: updatedProduct.thumbnail })
            return { status: "success", message: "Product updated" }
        }
    }



}


/*  getAll = async() => {
       if (fs.existsSync(productPath)) {
           try {
               let products = await fetch();
               return { status: "success", payload: products }
           } catch (error) {
               return { status: "error", error: error }
           }
       }
   } */


/*  add = async(product) => {
     if (fs.existsSync(productPath)) {
         try {
             let products = await fetch();
             if (products.length === 0) {
                 product.id = 1;
                 await fs.promises.writeFile(productPath, JSON.stringify([product], null, 2))
                 return { status: "success", message: "Product added" }
             }
             product.id = products[products.length - 1].id + 1;
             products.push(product);
             await fs.promises.writeFile(productPath, JSON.stringify(products, null, 2))
             return { status: "success", message: "Product added" }
         } catch (error) {
             return { status: "error", error: error }
         }

     }
     product.id = 1;
     await fs.promises.writeFile(productPath, JSON.stringify([product], null, 2))
     return { status: "success", message: "Product added" }
 } */

/* export default ProductManager; */

module.exports = ProductManager;