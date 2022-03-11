import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

// Select

/* database.from('cars').select('*')
    .then(data => {
        console.log(data);
        let cars = JSON.parse(JSON.stringify(data))
        console.log(cars);
    })
    .catch(console.log);
    .finally(() => database.destroy()); */

// Select Where

/* database.from('cars').select('*').where('price', '>', "30000")
    .then(data => {
        let cars = JSON.parse(JSON.stringify(data));
        console.log(cars);
    })
    .catch(console.log)
    .finally(() => database.destroy()); */

// Select by id

/* database.from('cars').select('*').where('id', 1)
    .then(data => {
        let cars = JSON.parse(JSON.stringify(data));
        console.log(cars);
    })
    .catch(console.log)
    .finally(() => database.destroy()); */

// select and order

database.from('cars').select('name', 'price').orderBy('price', 'desc')
    .then(data => {
        let cars = JSON.parse(JSON.stringify(data));
        console.log(cars);
    })
    .catch(console.log)
    .finally(() => database.destroy());