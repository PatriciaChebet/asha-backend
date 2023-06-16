import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto{
    @ApiProperty({
        description: "Type of the user",
        example: "user"
    })
    @IsNotEmpty({ message: "The user should have a type"})
    @Length(3, 255)
    type: string;

    @ApiProperty({
        description: "Name of the user",
        example: "Daniel"
    })
    @IsNotEmpty({ message: "The user should have a name"})
    @Length(3, 255)
    name: string;

}