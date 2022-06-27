const express = require('express');
const routerUsers = require('./routes/user.routes');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080;


// --------------- Middleware ---------------   
app.use(express.json());
app.use('/api', routerUsers)
app.use(cors());

// ----------------------------------------


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})