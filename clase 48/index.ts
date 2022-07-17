/* import {bgBlue, red, bold, parse} from "./devDependencias.ts"; */



/* console.log (parse("2020-01-01", "yyyy-MM-dd"));
console.log(bgBlue(bold(red("Hola mundo"))));
console.log(format(new Date(2019,0,20), "yyyy-MM-dd")); */

import{Application} from "./devDependencias.ts";

const app = new Application();

// Se debe inicializar la aplicación
app.use(ctx) => {
    ctx.response.body = "Hola mundo";
};

app.listen({port: 8080});
console.log("Servidor corriendo en el puerto 8080");
