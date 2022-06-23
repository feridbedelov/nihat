import { gql } from "@apollo/client";

export const CurrenciesDocument = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
