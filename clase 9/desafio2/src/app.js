const express = require('express');
const fs = require('fs');
const app = express();

const server = app.listen(8080, () => console.log("Listening on port 8080"));

app.engine('papaconquesitogratinado', (filePath, ObjectToReplace, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(new Error(err))
        const template = content.toString()
            .replace("^^titulo$$", '' + ObjectToReplace.titulo)
            .replace("^^mensaje$$", '' + ObjectToReplace.mensaje)
        return callback(null, template);
    })
})

app.set('views', './views')
app.set('view engine', 'papaconquesitogratinado')

app.get('/', (req, res) => {
    res.render('Bienvenida', {
        titulo: "PLANTILLA PROPIA",
        mensaje: "Hola plantilla propia"
    })
})