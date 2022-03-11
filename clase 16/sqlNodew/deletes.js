import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

database.from('cars').where('price', '<', '25000').del()
    .then(() => console.log("deleted cars"))
    .catch(console.log)
    .finally(() => database.destroy());