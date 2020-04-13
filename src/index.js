const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const PORT = process.env.PORT || 8080;

const path = require('path');

const admin = require('firebase-admin');

if (process.env.NODE_ENV === 'development') {
  console.log('Server is running in development mode');
  // React App will be built and served in production mode
  app.use(require('cors')());
  // run test functions
  require('./test')();
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://projectube-vc.firebaseio.com'
});

// Serve the front-end application
app.use(express.static(path.dirname(__dirname) + '/public'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running at:\thttp://localhost:${PORT}`);
    console.log(`GraphiQL is running at:\thttp://localhost:${PORT}/graphql`);
  }
});