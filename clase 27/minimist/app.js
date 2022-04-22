const parseArgs = require("minimist");

console.log(process.argv.slice(2))


const options = { default: { apellido: "chaparro" }, alias: { m: "modo", p: "puerto", d: "debug" } }

const objArguments = parseArgs(process.argv.slice(2), options);
console.log(objArguments)
console.log(objArguments.puerto)