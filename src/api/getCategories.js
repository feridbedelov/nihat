import { gql } from "@apollo/client";

export const CategoriesDocument = gql`
  query Categories {
    categories {
      name
    }
  }
`;
