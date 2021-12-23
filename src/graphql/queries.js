import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
`;