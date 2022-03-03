// Bundler: empaquetador de módulos que genera un único archivo
//npm install webpack webpack-cli
// Agregar "build": "webpack ./archivo1.js ./archivo2.js ./archivo3.js --mode=production ", en package.json (para ya mandarlo a producción. Existe el mode development)
// Para que ejecute en el empaquetado, agregar "start":"node dist/main.js", en package.json
// npm run build
import express, {Request,Response} from 'express';
import Perimeter from './clases/Perimeter'
import Surface from './clases/Surface';

const app = express();
const perimeterService = new Perimeter();
const surfaceService = new Surface();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,() => console.log(`Listening en ${PORT}`))

app.get('/operations',(req:Request,res:Response)=>{
    let figure:string = req.query.figure;
    if (figure==="square"){
        let side:number = parseInt(req.query.side);
        res.side({figure,params:{side},perimeter:perimeterService.square(side),surface:surfaceService.square(side)})
    }
    if(figure === "rectangle"){
        let width:number = parseInt(req.query.width);
        let height:number = parseInt(req.query.height);
        res.send({figure,params:{width,height},perimeter:perimeterService.rectangle(width,height),surface:surfaceService.rectangle(width,height)})
    }
    if (figure === "circle"){
        let radius:number = parseInt(req.query.radius);
        res.send({figure,params:{radius},perimeter:perimeterService.circle(radius),surface:surfaceService.circle(radius)})
    }
})
