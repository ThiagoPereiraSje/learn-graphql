const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// Setup a middleware that translate Rest to GraphQl
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Connect to mongodb cluster on mLab.com
// Make sure to pass your username and password
mongoose.connect(
  "mongodb+srv://thiago:test123@graphql-ninja.ifqjh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("connected to database!");
});

// Start express server
app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
