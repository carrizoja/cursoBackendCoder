const http = require('http');
const https = require('https');

const url = 'jsonplaceholder.typicode.com';

const option = {
    hostname: url,
    port: 443,
    path: '/todos',
    method: 'GET'
};

const request = https.request(option, (response) => {
    let data = "";
    response.on('data', (chunk) => {
        data += chunk;
    });
    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    })
});

request.on('error', (error) => {
    console.log(error);
})

request.end();