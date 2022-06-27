/* const axios = require('axios'); */
/* const got = require('got'); */
import got from 'got';

const url = 'https://jsonplaceholder.typicode.com/todos/4';

/* axios.get(url).then((res) => {
    console.log(res.data);
}).catch((err) => {
    console.log(err);
}); */

// with promises
/* const getData = async() => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

getData(); */

// with promises + got
const getData = async() => {
    try {
        const response = await got.get(url);
        console.log(JSON.parse(response.body));
    } catch (error) {
        console.log(error);
    }
}

getData();