
const {
    GraphQLUpload,
  } = require('graphql-upload');

const resolvers = {
    Query: {
        getAllUsers(parent,args,{user,dataSources},info) {
             return dataSources.userAPI.getAllUsers();
      }
    },
    Mutation: {
        createUser(parent,args,{user,dataSources},info){
             return dataSources.userAPI.createUsr(args) 
        },
        updateUser(parent,args,{user,dataSources},info){
          return dataSources.userAPI.updateUsr(args) 
        },
        deleteUser(parent,args,{user,dataSources},info){
          return dataSources.userAPI.deleteUsr(args)
        }
    }
  };

 module.exports = resolvers