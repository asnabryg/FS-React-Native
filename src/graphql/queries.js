import { gql } from "@apollo/client";
import { REPOSITORY } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...repository
        }
      }
    }
  }
  ${REPOSITORY}
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!){
    repository(id: $id) {
      ...repository
    }
  }
  ${REPOSITORY}
`;

export const GET_REVIEWS = gql`
  query repository($id: ID!){
    repository(id: $id) {
      ...repository
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY}
`;