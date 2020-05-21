const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');

const path = require('path');

const admin = require('firebase-admin');

const schema = require('./graphql/schema');
const PORT = process.env.PORT || 8080;

// Anything need to be initialized should be placed at ./initApps.js
require('./initApps')();

if (process.env.NODE_ENV === 'development') {
  console.log('Server is running in development mode');
  // run test functions
  require('./test')();
}

// Serve the front-end application
app.use(express.static(path.dirname(__dirname) + '/public'));

const server = new ApolloServer({
  schema,
  debug: false,
  cors: process.env.CORS === 'enable',
  context: async ({ req }) => {
    if (!req.headers || !req.headers.authorization) {
      return { user: null };
    }

    const claims = await admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .catch(console.log);

    console.log(claims);

    return {
      claims
    };
  }
});

server.applyMiddleware({ app });
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running at:\thttp://localhost:${PORT}`);
    console.log(`GraphiQL is running at:\thttp://localhost:${PORT}/graphql`);
  }
});
