import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Task } from "../../projects/entities/tasks.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @ApiPropertyOptional({ 
        description: "Unique identifier of the user",
        example: 1
     }) 
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: "Type of the user",
        example: "user"
    })
    @Column()
    type: string;

    @ApiProperty({
        description: "Name of the user",
        example: "Daniel"
    })
    @Column()
    name: string;

    @ApiPropertyOptional()
    @ManyToMany((type) => Task, (task) => task.tags)
    tags: Task[];

    @ApiPropertyOptional()
    @ManyToMany((type) => Task, (task) => task.owners)
    owners: Task[];

    @ApiPropertyOptional()
    @ManyToMany((type) => Task, (task) => task.accountable)
    accountable: Task[];

    @ApiPropertyOptional()
    @ManyToMany((type) => Task, (task) => task.subscribers)
    subscribers: Task[];

}