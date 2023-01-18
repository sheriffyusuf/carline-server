import { resolvers } from "@generated/type-graphql";
import { ApolloServer } from "apollo-server";
import { createServer } from "http";
import "reflect-metadata";
import * as tq from "type-graphql";
import { context } from "./context";

const PORT = process.env.PORT || 4000;

const app = async () => {
  const httpServer = createServer(app);
  const schema = await tq.buildSchema({
    resolvers,
  });

  const server = new ApolloServer({ schema, context: context });

  await server.start();
  httpServer.listen({ port: PORT }, () => {
    // console.log(`Server ready at ${url}!`);
    console.log(`GraphQL is listening on ${PORT}!`);
  });
  /*  .listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-typegraphql-crud#using-the-graphql-api`,
    ),
  ) */
};

app();
