import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

database.from('cars').where('name', 'Volvo').update({ price: 20000 })
    .then(() => console.log("updated car"))
    .catch(console.log)
    .finally(() => database.destroy());