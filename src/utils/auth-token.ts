import { IncomingMessage } from "http";
import jwt, { SignOptions } from "jsonwebtoken";
import { InvalidTokenError } from "../errors";

var isPlainObject = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export const signToken = (payload: object, options?: SignOptions): string =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "180 days",
    ...options,
  });

export const verifyToken = (token: string): { [key: string]: any } => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (isPlainObject(payload)) {
      return payload as { [key: string]: any };
    }
    throw new Error();
  } catch (error) {
    throw new InvalidTokenError();
  }
};

export const getAuthTokenFromRequest = (
  req: IncomingMessage
): string | null => {
  const header = req.headers.authorization;
  if (header) {
    const [bearer, token] = header.split(" ");
    return bearer === "Bearer" && token ? token : null;
  }
  return null;
};
