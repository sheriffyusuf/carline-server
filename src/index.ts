require("module-alias").addAlias("@", __dirname);
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLScalarType } from "graphql";
import { DateTimeResolver } from "graphql-scalars";
import "reflect-metadata";
import * as tq from "type-graphql";
import { Context, prisma } from "./context";
import { resolvers } from "./resolvers";
import { getAuthTokenFromRequest } from "./utils";

const PORT = process.env.PORT || 4000;

const main = async () => {
  //  const app = express();
  // const httpServer = createServer(app);
  const schema = await tq.buildSchema({
    resolvers,
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer<Context>({
    schema,
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      prisma,
      token: getAuthTokenFromRequest(req),
    }),
    listen: { port: 4000, path: "/graphql" },
  });
  console.log(`GraphQL server is listening on ${url}`);
};

main();
