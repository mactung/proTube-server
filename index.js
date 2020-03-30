const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://MagicalLizard:shawnwasabi1805@cluster0-sclmo.gcp.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open',() => {
  console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Projectube's server is running on port ${PORT}`)
  }
})
