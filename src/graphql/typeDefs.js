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
  input Filter {
    categories: String,
    location: String,
    
  }
  type SearchResult {
    users: [User!]
    orgs: [Org!]
    events: [Event!]
  }
  type Contact {
    email: String
    phoneNumber: String
    facebook: String
  }
  type Notification {
    title: String
    description: String
    image: String
    url: String
  }
  type User {
    _id: ID,
    name: String,
    bio: String,
    dob: String
    ava: String,
    contact: Contact
    wishlist: [Org]!
    appliedList: [Org]!
    following: [User]!
    notifications: [Notification]!
  }
  type Event {
    _id: ID
    title: String
    content: String
    localhost: String
    startDate: String
    dueDate: String
    org: Org
  }
  type Org {
    _id: ID,
    name: String
    description: String
    contact: Contact
    categories: [String]!
    logo: String
    notifications: [Notification]!
    events: [Event]!
  }
`;
