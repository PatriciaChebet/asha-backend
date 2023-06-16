import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./projects.entity";
import { User } from "../../users/entities/user.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum Stage{
    BACKLOG = "backlog",
    INPROGRESS = "in-progress",
    FINISHED = "finished",
}

@Entity('tasks')
export class Task extends BaseEntity{
    @ApiPropertyOptional({ 
        description: "Unique identifier of the task",
        example: 1
     }) 
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: "Name of the Task",
        example: "Create a new workflow"
    })
    @Column({
        type: 'varchar'
    })
    name: string;

    @ApiProperty({
        description: "The stage the task is in.",
        example: "backlog"
    })
    @Column({
        type: 'enum',
        enum: Stage,
        default: Stage.BACKLOG
    })
    stage: Stage;
    
    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project;

    @ApiPropertyOptional()
    @ManyToMany(type => User)
    @JoinTable({
    name: "tags", 
    joinColumn: {
        name: "taskId",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "userId",
        referencedColumnName: "id"
    }})
    tags: User[];

    @ApiPropertyOptional()
    @ManyToMany(type => User)
    @JoinTable({
    name: "owners", 
    joinColumn: {
        name: "taskId",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "userId",
        referencedColumnName: "id"
    }})
    owners: User[];

    @ApiPropertyOptional()
    @ManyToMany(type => User)
    @JoinTable({
    name: "accountable", 
    joinColumn: {
        name: "taskId",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "userId",
        referencedColumnName: "id"
    }})
    accountable: User[];

    @ApiPropertyOptional()
    @ManyToMany(type => User)
    @JoinTable({
    name: "subscribers", 
    joinColumn: {
        name: "taskId",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "userId",
        referencedColumnName: "id"
    }})
    subscribers: User[];

}