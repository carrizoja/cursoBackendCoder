console.log('app started');

process.on('uncaughtException', (err) => {
    console.log(err)
})

callUndefinedFunction();


process.on('exit', () => {
    console.log('exit');
})