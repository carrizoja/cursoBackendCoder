const express = require('express');
const app = express();
const routerUser = require('./src/routes/user');


app.use('/api', routerUser);

app.listen(8080, () => {
    console.log('Server is running');
})