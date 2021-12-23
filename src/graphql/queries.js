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