const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');

const path = require('path');

const admin = require('firebase-admin');

const schema = require('./graphql/schema');
const PORT = process.env.PORT || 8080;


admin.initializeApp({
  credential: admin.credential.cert('config/serviceAccount.json'),
  databaseURL: 'https://projectube-vc.firebaseio.com'
});

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
  cors: process.env.NODE_ENV === 'development',
  context: async ({ req }) => {
    if (!req.headers || !req.headers.authorization) {
      return { user: null };
    }

    const user = await admin
      .auth()
      .verifyIdToken(req.headers.authorization) 
      .catch(() => null);

    return { 
      user
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
