import { gql } from "@apollo/client";

export const REPOSITORY = gql`
  fragment repository on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    url
  }
`;