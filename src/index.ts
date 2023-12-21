import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql/mergeSchemas';
import { makeExecutableSchema } from "@graphql-tools/schema";
import authDirectiveTransformer from './graphql/directives/authDirective';
import express from 'express';
const PORT = 4000;

const app = express();

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Add the auth directive to the schema
schema = authDirectiveTransformer(schema, 'auth');

const runServer = async () => {
  const server = new ApolloServer({ 
    schema,
    context: ({ req }) => ({ req }), 
  });
  await server.start();
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
  server.applyMiddleware({ app });  
}

runServer();