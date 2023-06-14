import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty({ message: "The user should have a type"})
    @Length(3, 255)
    type: string;

    @IsNotEmpty({ message: "The user should have a name"})
    @Length(3, 255)
    name: string;

}