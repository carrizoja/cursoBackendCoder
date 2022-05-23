const express = require('express');
const cluster = require('cluster');
const { cpus } = require('os');

const app = express();
const PORT = parseInt(process.argv[2]) || 8080;
const clusterMode = process.argv[3] || "CLUSTER";


function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i < num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

if (clusterMode && cluster.isMaster) {

    const numCpus = cpus().length;
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

} else {
    app.get('/', (req, res) => {
        const primos = [];
        const max = Number(req.query.max) || 1000;
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) {
                primos.push(i);
            }
        }
    })
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`PID Worker ${process.pid}`);
    });

}