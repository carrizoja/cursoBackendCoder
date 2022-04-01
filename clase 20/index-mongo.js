const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://carrizoja:Sietepalabras155@codercluster18335.gtx5o.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {

    if (error) throw new Error('Cannot connect to MongoDB')
    console.log("Base conectada")
})