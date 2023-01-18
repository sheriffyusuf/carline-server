import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

// export const context: Context = {
//   prisma: prisma,
// };

// export interface Context {
//   prisma: PrismaClient;
// }

export const context = async (): Promise<Context> => ({
  prisma,
});
/* export const context = async () Promise<Context> => ({
  prisma,
}); */
