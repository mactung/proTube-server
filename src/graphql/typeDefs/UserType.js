module.exports = `
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
`;
