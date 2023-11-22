import { productFragment, variantFragment } from '../fragments';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $first: Int) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: $first) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts($sortKey: ProductSortKeys, $reverse: Boolean, $first: Int) {
    products(sortKey: $sortKey, reverse: $reverse, first: $first) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductBySelectedOptionsQuery = /* GraphQL */ `
  query getProductBySelectedOptions($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      ...product
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...variant
      }
    }
  }
  ${productFragment}
  ${variantFragment}
`;