export const typeDefs = /* GraphQL */ `
  type Query {
    health: String!
  }

  type UserPosition {
    address: String!
    totalDeposited: String!
    totalWithdrawn: String!
    currentShares: String!
    lastActivityAt: String!
  }
`;
