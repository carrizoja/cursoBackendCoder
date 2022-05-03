const express = require('express');
const app = express();

const PORT = 8080;


app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {
        // do nothing
    }
    res.send(`running the process ${process.pid} sin vigilancia`);
})

app.listen(8080, () => {
    console.log(`running on port ${PORT}`);

})