const request = require('supertest')('http://localhost:8080/api/products');
const expect = require('chai').expect;
const fs = require('fs');
const initialData = require('./data/initialData.js');

const fileName = "src/files/products.json";

describe('Test API', () => {
    before(() => {
        console.log('---------- Start Test ----------\n');
        createProductsFile();
    });

    after(() => {
        console.log('\n---------- End Test ----------');
    });

    describe('GET Products', () => {
        it('Should return status code 200', async() => {
            const response = await request.get('/');
            expect(response.status).to.equal(200);
        })

        /*   it('Should return JSON format', async() => {
              const response = await request.get('/');
              expect(response.type).to.equal('application/json; charset=utf-8');
          }) */

        /*   it('Should be equal to initial content', async() => {
              let response = await request.get('/');
              const initial = JSON.parse(initialData);
              for (let i = 0; i < initial.products.length; i++) {
                  expect(response.body[i]).to.include.keys("title", "id", "name", "price", "thumbnail", "timestamp");
                  expect(response.body[i].title).to.equal(initial.products[i].title);
                  expect(response.body[i].id).to.equal(initial.products[i].id);
                  expect(response.body[i].name).to.equal(initial.products[i].name);
                  expect(response.body[i].price).to.equal(initial.products[i].price);
                  expect(response.body[i].thumbnail).to.equal(initial.products[i].thumbnail);
                  expect(response.body[i].timestamp).to.equal(initial.products[i].timestamp);

              }
          }) */

    })

    /* describe('POST Product', () => {
        it('Should add a new product', async() => {
            const newProduct = {
                name: "Memory",
                price: 2000,
                thumbnail: "https://images-americanas.b2w.io/produtos/01/00/item/1300/1308/1300801_1GG.jpg",

            }
            const response = await request.post('/').send(newProduct);
            expect(response.status).to.equal(201);
            expect(response.body).to.include.keys("title", "id", "name", "price", "thumbnail", "timestamp");
            expect(response.body.title).to.equal(newProduct.name);
            expect(response.body.id).to.equal(1);
            expect(response.body.name).to.equal(newProduct.name);
            expect(response.body.price).to.equal(newProduct.price);
            expect(response.body.thumbnail).to.equal(newProduct.thumbnail);
            expect(response.body.timestamp).to.be.a('number');
        });
    }); */

    /*  describe('PUT Product', () => {
         it('Should update a product with id = 2', async() => {
             const editProduct = {
                 id: 2,
                 data: {
                     name: "Memory",
                     price: 2000,
                     thumbnail: "https://images-americanas.b2w.io/produtos/01/00/item/1300/1308/1300801_1GG.jpg",
                 }


             }
             const response = await request.put('/').send(editProduct);
             expect(response.body).to.include.keys("id", "data");
             expect(response.body.data).to.include.keys("title", "id", "name", "price", "thumbnail", "timestamp");
             expect(response.body.id).to.equal(editProduct.id);
             expect(response.body.data.title).to.equal(editProduct.data.title);
             expect(response.body.data.price).to.equal(editProduct.data.price);
             expect(response.body.data.thumbnail).to.equal(editProduct.data.thumbnail);
         });

     }); */

    /*  describe('DELETE Product', () => {
         it('Should delete a product with id = 2', async() => {
             const deleteProduct = {
                 id: 2
             }


             const response = await request.delete('/').send(deleteProduct);
             expect(response.body).to.include.keys("id");
             expect(response.body.id).to.equal(deleteProduct.id);
         });
     }) */

})


// Auxiliary functions
function createProductsFile() {
    fs.writeFileSync(fileName, initialData.toString());
}