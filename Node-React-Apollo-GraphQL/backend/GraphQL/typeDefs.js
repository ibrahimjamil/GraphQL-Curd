const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
       _id:String!
       name:String!
       email:String!
    }
    type SUCCESS{
        success:Boolean!
    }
    type Query {
        getAllUsers: [User]
    }
    type Mutation {
        createUser(name: String!, email: String!): User
        updateUser(id:String!, name: String!, email: String!): User
        deleteUser(id:String!): SUCCESS
    }
`;

module.exports = typeDefs