const express = require('express');
const path = require('path');
const CPUS = require('os').cpus();
const router = express.Router();
const parseArgs = require("minimist");

router.get("/info", (req, res) => {
    const options = { default: { name: "José", lastName: "Carrizo" } };
    console.log(parseArgs(process.argv, options));
    res.send(`<p>Project Path </p>
                  ${process.cwd()}
                 <p>Process ID </p> 
                 ${process.pid}
                 <p>NODE version</p> 
                 ${process.version}
                 <p>OS</p>
                 ${process.platform}
                 <p>RSS Reserved Memory </p> 
                 ${process.memoryUsage().rss}
                 <p> NODE executec path
                 ${process.execPath}
                 <h3> Please, watch console results for more information</h3>`);
});

router.get('/api/info', (req, res) => {
    const info = {
        argumentos: process.argv,
        SO: process.platform,
        version_node: process.version,
        memoria_total_reservada: process.memoryUsage().rss,
        path_de_ejecucion: process.execPath,
        PID: process.pid,
        carpeta_del_proyecto: process.cwd(),
        num_cpus: CPUS.length
    }

    console.log("La info es: ", info);

    res.json({ info });
});

module.exports = router;