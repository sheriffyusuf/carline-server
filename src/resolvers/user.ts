import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../context";
import { IsAuth } from "../middlewares";
import { User, UserStatus } from "../models";
@InputType()
class UserLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class UserCreateInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  @UseMiddleware(IsAuth)
  async userProfile(@Ctx() ctx: Context) {
    //TODO: fix this implementation
    return [];
    //  return ctx.prisma.user.findMany();
  }
  @Mutation((returns) => UserStatus)
  async createAccount(
    @Arg("data") data: UserCreateInput,
    @Ctx() ctx: Context
  ): Promise<UserStatus> {
    try {
      const hashedPassword = await argon2.hash(data.password);
      const { email, firstName, lastName } = data;
      await ctx.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });
      //  return { ok: true, error: "Account created successfully." };
      return { value: true, message: "Account created successfully." };
    } catch (error) {
      //      console.log("error: ", error);
      return { value: false, message: "An error occured." };
    }
  }
  @Mutation((returns) => UserStatus)
  async login(
    @Arg("data") data: UserLoginInput,
    @Ctx() ctx: Context
  ): Promise<UserStatus> {
    try {
      //1
      const existingUser = await ctx.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!existingUser) {
        return { message: "User not found", value: false };
      }

      //2
      const passwordMatch = await argon2.verify(
        existingUser.password,
        data.password
      );
      if (!passwordMatch) {
        return { message: "Incorrect password", value: false };
      }

      //3
      const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET);
      return {
        value: true,
        user: existingUser,
        token,
        message: "Login successful",
      };
    } catch (e) {
      console.log("error: ", e);
      return { value: false, message: "An error occured." };
    }
  }
}
