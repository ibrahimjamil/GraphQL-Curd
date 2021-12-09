const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const dotenv = require('dotenv')
const typeDefs = require('./GraphQL/typeDefs')
const resolvers = require('./GraphQL/resolvers')
const UserApi = require('./GraphQL/dataSource/userApi')
const connectDB = require('./config/db')
const {
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const restApi = require('./rest/restApi')


async function startApolloServer(typeDefs, resolvers) {
  dotenv.config({path:'./config/config.env'})
  await connectDB(process.env.MONGO_URI)
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
      let user = "admin"
      return {user}
    },
    dataSources: () => {
      return {
        userAPI: new UserApi(),
      }
    },
    introspection: false,
  });
  await server.start();
  app.use('/',restApi)
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app , path: '/'});
  await app.listen(5000);
  console.log(`🚀 Server ready at http://localhost:5000`);
}

startApolloServer(typeDefs,resolvers)