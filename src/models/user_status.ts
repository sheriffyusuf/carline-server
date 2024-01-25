import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";

@ObjectType({ description: "sending other values along with user schema" })
export class UserStatus {
  @Field()
  message: string;

  @Field()
  value: boolean;

  @Field({ nullable: true })
  action?: string;

  @Field({ nullable: true })
  token?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
