const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();

// counts numbers of CPUs
const numCPUs = os.cpus().length;

const PORT = 8080;


app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {
        // do nothing
    }
    res.send(`running the process ${process.pid}`);
    /* cluster.Worker.kill(); */
})

if (cluster.isPrimary) {
    // create clones
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Process ${process.id} died`);
        cluster.fork();
    })
} else {
    app.listen(PORT, () => console.log(`running process ${process.pid} on port ${PORT}`));
}


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);

})