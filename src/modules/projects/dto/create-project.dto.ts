import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateProjectDto{
    @ApiProperty({
        description: "Name of the project",
        example: "Project Management App"
    })
    @IsNotEmpty({ message: "The project should have a name"})
    @Length(3, 255)
    name: string;

    @ApiProperty({
        description: "More details or information about the project",
        example: "Assists in task management"
    })
    @IsNotEmpty({message: "The project should have a description"})
    @Length(3)
    description: string;

}