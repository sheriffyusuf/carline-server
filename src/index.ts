import "reflect-metadata";
import { resolvers } from "@generated/type-graphql";
//import { ApolloServer } from "apollo-server";
//import { createServer } from "http";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as tq from "type-graphql";
import { context } from "./context";

const PORT = process.env.PORT || 4000;
interface MyContext {
  token?: String;
}

const main = async () => {
  //  const app = express();
  // const httpServer = createServer(app);
  const schema = await tq.buildSchema({
    resolvers,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    context: async () => await context(),
    listen: { port: 4000, path: "/graphql" },
  });
  console.log(`GraphQL server is listening on ${url}`);
  //await server.start();
  //server.applyMiddleware({ app, path: `/graphql` });
  /*   httpServer.listen({ port: PORT }, () => {
    // console.log(`Server ready at ${url}!`);
    console.log(`GraphQL is listening on ${PORT}!`);
  }); */
  /*  .listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-typegraphql-crud#using-the-graphql-api`,
    ),
  ) */
};

main();
