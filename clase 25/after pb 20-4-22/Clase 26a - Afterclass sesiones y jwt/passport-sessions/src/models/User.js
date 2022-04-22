const mongoose = require("mongoose");

const userCollection = "users";

const userSchema = new mongoose.Schema(
    {
        name: { type:String },
        username: {type: String, required:true},
        password: {type: String, required: true}
    }
)

const User = mongoose.model(userCollection, userSchema);

module.exports = User;