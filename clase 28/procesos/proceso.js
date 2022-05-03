console.log(1);
console.log(2);
console.log(3);
console.log(4);


for (let i = 0; i < 2e9; i++) {
    console.log(i);
    if (i === 10000) {
        process.exit();
    }
}



process.on('beforeExit', () => {
    console.log('Before Exit');
})

process.on('exit', () => {
    console.log('exit');
})