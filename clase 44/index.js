const express = require('express');

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Scheme construction
const schema = buildSchema(`
    type Client {
        id: Int,
        name: String,
        telephone: String,
    }
    type Query {
        clients: [Client],
        client(id:Int): Client
    }

    type Mutation {
        addClient(name: String, telephone: String): Client
    }
`);

const clients = []
let counter = 1;
// Define methods to retrieve data
const root = {
    clients: () => {
        return clients;
    },
    client: (data) => {
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id === data.id) {
                return clients[i];
            }
        }
        return null;
    },
    addClient: (data) => {
        let newClient = {
            id: counter,
            name: data.name,
            telephone: data.telephone
        };
        clients.push(newClient);
        counter++;
        return newClient;
    },
};


const app = express();
const PORT = 4000;
app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true

    }

));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})