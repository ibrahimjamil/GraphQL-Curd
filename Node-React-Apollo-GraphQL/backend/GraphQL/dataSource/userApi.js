const { RESTDataSource } = require('apollo-datasource-rest');
class UserAPI extends RESTDataSource {
    //here we access all restApi methods like POST, GET, DELETE, PUT as class extends from RESTDataSource class
    constructor() {
      super();
      this.baseURL = 'http://localhost:5000/';
    }

    async createUsr(usr){
        const user = await this.post('/createUser',usr)
        return user
    }

    async getAllUsers() {
      const listOfUsers = await this.get('/getUsers')
      return listOfUsers
    }

    async updateUsr(user){
      const updatedUser = await this.put('/updateUser',user)
      return updatedUser
    }
    
    async deleteUsr(user){
      const id = user.id
      const deleteUser = await this.delete(`/deleteUser/:${id}`)
      return deleteUser
    }
  }

  module.exports = UserAPI