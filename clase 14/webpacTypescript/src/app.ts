// Agregar  "init-tsc": "tsc --init" en package.json
//npm run init-tsc
// It a tsconfig.json y modificar línea 78 con "noImplicitAny": false,  
// Crear Webpack.config.js
// npm install ts-loader
//  "init-tsc": "tsc --init","start": "node .","build": "webpack", agregar en package.json
// npm install webpack-node-externals
import express from 'express';
import {getTime} from './utils/utils';
import Person from './Person';

const person1:Person = new Person("Alejandro", "Huertas");

const app = express();
const PORT = 8080;
app.get('/',(req,res)=> {
    res.send({
        time:getTime(),
        name:person1.getFullName()
    })
})

app.listen(PORT,()=> console.log(`Listening on ${PORT}`))
