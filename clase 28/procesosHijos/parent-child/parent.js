const { fork } = require('child_process');

// create child process
const child = fork('./child.js');

console.log('parent process init');
child.send('inizialize');

child.on('message', (childMsg) => {
    console.log("child message", childMsg);
})