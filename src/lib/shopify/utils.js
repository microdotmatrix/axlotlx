export const defaultSort = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const HIDDEN_PRODUCT_TAG = 'next-hidden';
export const DEFAULT_OPTION = 'Default Title';

export const isObject = (/** @type {null} */ object) => {
  return typeof object === 'object' && object !== null && !Array.isArray(object);
};

export const isShopifyError = (/** @type {any} */ error) => {
  if (!isObject(error))
  return false;
  if (error instanceof Error)
  return true;
  return findError(error);
};

/**
* @param {any} error
*/
function findError(error) {
  if (Object.prototype.toString.call(error) === '[object Error]') {
    return true;
  }
  const prototype = Object.getPrototypeOf(error);
  return prototype === null ? false : findError(prototype);
}

/**
* @param {any} err
*/
export function formatErrorMessage(err) {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export const removeEdgesAndNodes = (/** @type {{ edges: any[]; }} */ array) => {
  return array.edges.map((/** @type {{ node: any; }} */ edge) => edge?.node);
};

export const reshapeCart = (/** @type {{ cost: { totalTaxAmount: { amount: string; currencyCode: string; }; }; lines: any; }} */ cart) => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }
  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

export const reshapeCollection = (/** @type {{ handle: any; }} */ collection) => {
  if (!collection) {
    return undefined;
  }
  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

export const reshapeCollections = (/** @type {any} */ collections) => {
  const reshapedCollections = [];
  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);
      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }
  return reshapedCollections;
};

export const reshapeProduct = (/** @type {{ [x: string]: any; tags?: any; images?: any; variants?: any; }} */ product, filterHiddenProducts = true) => {
  if (!product) {
    return undefined;
  }
  const { images, variants, ...rest } = product;
  return {
    ...rest,
    images: removeEdgesAndNodes(images),
    variants: removeEdgesAndNodes(variants)
  };
};

export const reshapeProducts = (/** @type {any} */ products) => {
  const reshapedProducts = [];
  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);
      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }
  return reshapedProducts;
};

export const shopify = {
  products: (/** @type {any} */ data) => {
    return reshapeProducts(removeEdgesAndNodes(data))
  },
  product: (/** @type {any} */ data) => {
    return reshapeProduct(data)
  },
  collections: (/** @type {any} */ data) => {
    return reshapeCollections(removeEdgesAndNodes(data))
  },
  cart: (/** @type {any} */ data) => {
    return reshapeCart(data)
  }
}