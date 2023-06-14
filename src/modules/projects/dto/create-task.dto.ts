import { IsNotEmpty, Length } from "class-validator";
import { Stage } from "../entities/tasks.entity";
import { User } from "src/modules/users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty({
        description: "Name of the Task",
        example: "Create a new workflow"
    })
    @IsNotEmpty({ message: "The task should have a name"})
    @Length(3, 255)
    name: string;

    @ApiProperty({
        description: "The stage the task is in",
        example: "backlog"
    })
    @IsNotEmpty({message: "The task should have a stage"})
    @Length(3)
    stage: Stage;  

    @ApiProperty()
    @IsNotEmpty()
    projectId: number;

    @ApiProperty()
    @IsNotEmpty()
    tags: User[];

    @ApiProperty()
    @IsNotEmpty()
    owners: User[];

    @ApiProperty()
    @IsNotEmpty()
    accountable: User[];

    @ApiProperty()
    @IsNotEmpty()
    subscribers: User[];

}