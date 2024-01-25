import { IsEmail } from "class-validator";
import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => String, { nullable: true })
  avatar?: string | null;

  @Field((type) => Date)
  createdAt: Date;

  password: string;
}
