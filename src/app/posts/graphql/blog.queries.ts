import { gql } from "apollo-angular";

export const GET_ALL_POSTS = gql`
  query posts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          id
          name
        }
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
        name
      }
    }
  }
`;
