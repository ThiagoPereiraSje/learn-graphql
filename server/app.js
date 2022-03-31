require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow cross-origin requests
app.use(cors());

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
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

mongoose.connection.once("open", () => {
  console.log("connected to database!");
});

// Start express server
app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
