const { exec } = require('child_process');

console.log(1)
console.log(2)
console.log(3)

exec('find /', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return
    }
    if (stderr) {
        console.log(stderr);
        return
    }
    console.log('salida del proceso hijo \n', stdout);
})
console.log(4)
console.log(5);