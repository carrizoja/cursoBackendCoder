import { normalize, denormalize, schema } from 'normalizr';
import {createRequire} from 'module'; // Bring the hability to use the require function
const require = createRequire(import.meta.url); // construtor function to use the require function
const holding = require('./holding.json'); // use the require function to bring the json file


console.log(holding);

// Nornmalization process
const employeeScheme = new schema.Entity('employees');
const companyScheme = new schema.Entity('company', {
    gerente: employeeScheme,
    encargado: employeeScheme,
    empleados: [employeeScheme]
})
const holdingScheme = new schema.Entity('holding', {
    empresa: [companyScheme]
})

let normalizedData = normalize(holding, holdingScheme);
console.log(JSON.stringify(normalizedData, null, '\t'));
let normalizedLenght = JSON.stringify(normalizedData, null, '\t').length;
let originalLenght = JSON.stringify(holding, null, '\t').length;
console.log(`Normalized lenght: ${normalizedLenght}`);
console.log(`Original lenght: ${originalLenght}`);
console.log(`Percentage: ${(normalizedLenght * 100) / originalLenght}%`);