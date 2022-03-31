import { gql } from "@apollo/client";

export const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;
