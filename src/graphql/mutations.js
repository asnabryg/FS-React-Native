import { gql } from "@apollo/client";
import { REPOSITORY } from "./fragments";

export const CREATE_USER = gql`
	mutation createUser($username: String!, $password: String!){
		createUser (username: $username, password: $password) {
			username
		}
	}
`;

export const SIGN_IN = gql`
	mutation authorize($username: String!, $password: String!) {
		authorize(credentials: {
			username: $username,
			password: $password
		}){
			accessToken
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation createReview(
    $repositoryName: String!,
    $ownerName: String!,
    $rating: Int!,
    $text: String
  ) {
		createReview (
			review: {
				repositoryName: $repositoryName
				ownerName: $ownerName,
				rating: $rating,
				text: $text
			}
		) {
			repositoryId
			repository {
				...repository
			}
		}
	}
	${REPOSITORY}
`;

export const SIGN_UP = gql`
	mutation createUser($username: String!, $password: String!) {
		createUser (
			user: {
				username: $username
				password: $password
			}
		) {
			username
		}
	}
`;