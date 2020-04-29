module.exports = `
  type Mutation {
    userSignUp(
      email: String!
      password: String!
      name: String!
      dob: String!
      gender: String!
      phoneNumber: String
      favoriteCategories: [String]!
    ): String!
  }
`;
