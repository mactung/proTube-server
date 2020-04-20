module.exports = `
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
