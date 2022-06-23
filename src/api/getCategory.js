import { gql } from "@apollo/client";

export const CategoryDocument = gql`
  query Category($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
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
  }
`;
