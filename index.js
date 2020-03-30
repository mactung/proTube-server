const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');

const PORT = process.env.PORT || 8080;


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Projectube's server is running on port ${PORT}`);
    console.log(`GraphiQL is running at http://localhost:${PORT}/graphql`);
  }
});
