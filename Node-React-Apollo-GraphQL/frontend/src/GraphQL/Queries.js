import { gql } from "@apollo/client";


//Read is for queries rest is for mutation
export const LOAD_USERS = gql`
  query {
    getAllUsers {
      _id
      name
      email
    }
  }
`;
