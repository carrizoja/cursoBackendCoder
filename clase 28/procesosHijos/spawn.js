const { spawn } = require('child_process');

// create child process
const child = spawn('find', ['/']);

child.stdout.on('data', data => {
    console.log(data.toString());
})