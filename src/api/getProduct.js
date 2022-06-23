import { gql } from "@apollo/client";

export const ProductDocument = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
      attributes {
        items {
          displayValue
          value
        }
        type
        name
      }
    }
  }
`;
