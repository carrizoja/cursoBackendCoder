const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Product {
    id: ID!
    name: String,
    price: Float,
    thumbnail: String,
    timestamp: String

}
input ProductInput {
    title: String,
    price: Float,
    thumbnail: String
}
type Query {
    getProducts: [Product],

}
type Mutation {
    createProduct(product: ProductInput): Product,
    updateProduct(id: ID!, product: ProductInput): Product,
    deleteProduct(id: ID!): Product,
}

`);

module.exports = schema;