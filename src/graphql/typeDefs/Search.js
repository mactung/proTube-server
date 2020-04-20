module.exports = `
  input Filter {
    categories: String,
    location: String,
    
  }
  type SearchResult {
    users: [User!]
    orgs: [Org!]
    events: [Event!]
  }
`;
