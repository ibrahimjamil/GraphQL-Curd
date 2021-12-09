
import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
    $email: String!
  ) {
    createUser(
      name: $name
      email: $email
    ) {
      _id
      name
      email
    }
  }
  `;
  export const UPDATE_USER_MUTATION = gql`
    mutation updateUser(
      $id: String!
      $name: String!
      $email: String!
    ){
      updateUser(id:$id, name:$name, email:$email){
       name
      }
    }
  `;

  export const DELETE_USER_MUTATION = gql`
    mutation deleteUser(
      $id: String!
    ){
      deleteUser(id:$id){
       success
      }
    }
  `;
