import { InvalidTokenError } from "@/errors";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../context";
import { verifyToken } from "../utils";

export const IsAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  //console.log("this is the crazy context ", context?.token);
  const token = context?.token;
  if (!token) {
    throw new InvalidTokenError("Authentication token not found.");
  }
  const userId = verifyToken(token).id;
  if (!userId) {
    throw new InvalidTokenError("Authentication token is invalid.");
  }
  const user = await context.prisma.user.findFirst({ where: { id: userId } });
  // const user = await User.findOneBy({ id: userId });
  if (!user) {
    throw new InvalidTokenError(
      "Authentication token is invalid: User not found."
    );
  }
  context.payload = { userId: user.id };
  return next();
};
