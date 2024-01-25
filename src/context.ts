import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  token: string | null;
  payload?: {
    userId: number;
  };
}

// export const context: Context = {
//   prisma: prisma,
// };

// export interface Context {
//   prisma: PrismaClient;
// }

/* export const contextd: Context = {
  prisma: prisma,
};
export const context: ContextFunction<
[StandaloneServerContextFunctionArgument],
TContext
> = {
  prisma: prisma,
}; */
/* export const context = async () Promise<Context> => ({
  prisma,
}); */
