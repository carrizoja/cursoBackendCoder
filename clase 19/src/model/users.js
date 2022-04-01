import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    // ¿Qué necesita tener un usuario
    first_name: {
        type: String,
        required: true //Tipo string y tiene que ser requerido. Algo parecido al not null

    },
    first_name: {
        type: String,
        required: true //Tipo string y tiene que ser requerido. Algo parecido al not null

    },
    age: Number,
    email: {
        type: String,
        required: true
    }

})

export const usersService = mongoose.model(userCollection, userSchema);