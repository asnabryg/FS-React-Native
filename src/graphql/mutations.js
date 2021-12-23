import { gql } from "@apollo/client";

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