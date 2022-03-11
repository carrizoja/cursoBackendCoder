import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);
const cars = [
    { name: "Volvo", price: 34123 },
    { name: "Audi", price: 20000 },
    { name: "Hummer", price: 34123 },
    { name: "Bentley", price: 10000 },
    { name: "Volvo2", price: 34123 },
]

database('cars').insert(cars)
    .then(console.log)
    .catch(console.log)
    .finally(() => database.destroy())