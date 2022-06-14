const express = require('express')
const { db } = require('./db')
const routerData = require('./src/routes/users.Route')
const app = express()
app.use(express.json())
app.use("api/data", routerData);

app.listen(8080, () => {
    console.log('Server running on port 8080')
        // inizialize database
    db.sync({ force: true })
        .then(() => {
            console.log('Database connected')
        })
        .catch((err) => {
            console.log('Error: ' + err)
        })
})