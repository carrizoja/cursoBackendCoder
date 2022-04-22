const express = require("express");
require("dotenv").config(); // add variables from .env file

console.log(process.env)
const PORT = process.env.PORT || 8080;
const app = express();
app.listen(process.env.PORT, () => console.log(`listening on port ${PORT}`));