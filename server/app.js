const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// Setup a middleware that translate Rest to GraphQl
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
  })
);

// Start express server
app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
