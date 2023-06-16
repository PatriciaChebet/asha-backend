import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./tasks.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity('projects')
export class Project extends BaseEntity{
    @ApiPropertyOptional({ 
        description: "Unique identifier of the project",
        example: 1
     })    
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: "Name of the project",
        example: "Project Management App"
    })
    @Column({
        type: 'varchar'
    })
    name: string;

    @ApiProperty({
        description: "More details about the project",
        example: "Assists in task management"
    })
    @Column({
        type: 'text'
    })
    description: string;

    @ApiPropertyOptional()
    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

}