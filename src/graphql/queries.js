import { gql } from "@apollo/client";
import { REPOSITORY } from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $direction: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories (
      orderBy: $orderBy
      orderDirection: $direction
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ){
      totalCount
      edges {
        node {
          ...repository
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
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
  query repository($id: ID!, $first: Int, $after: String){
    repository(id: $id) {
      ...repository
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${REPOSITORY}
`;