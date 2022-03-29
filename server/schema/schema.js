const graphql = require("graphql");
const lodash = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Mock some data
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      // id is the argument expected in the query
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Code to get data from DB/other source
        return lodash.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
