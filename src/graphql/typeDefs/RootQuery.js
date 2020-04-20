module.exports = `
  type Query {
    users(limit: Int): [User!]!
    user(id: ID): User
    orgs(limit: Int): [Org!]!
    org(id: ID!): Org
    events(limit: Int): [Event!]!
    event(id: ID!): Event
    search(
      str: String!,
      filter: Filter
    ): SearchResult!
  }
`;
