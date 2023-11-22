export const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url(transform: {preferredContentType: WEBP, maxWidth: 1200, maxHeight: 1200})
    altText
    width
    height
  }
`;

