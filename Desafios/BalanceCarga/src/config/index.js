const yargs = require('yargs')(process.argv.slice(2));
const { ObjectTools } = require('../utils/tools');
require('dotenv').config();

let args = yargs
    .default({
        "MODE": "CLUSTER",
        "PORT": 8000,
    })
    .alias({
        m: "MODE",
        p: "PORT"
    })
    .argv;
args = ObjectTools.removeAllPropertiesExcept(args, ["MODE", "PORT"]);

module.exports = { args };