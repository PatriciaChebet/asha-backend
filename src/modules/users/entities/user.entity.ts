import { Task } from "src/modules/projects/entities/tasks.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @ManyToMany((type) => Task, (task) => task.tags)
    tags: Task[];

    @ManyToMany((type) => Task, (task) => task.owners)
    owners: Task[];

    @ManyToMany((type) => Task, (task) => task.accountable)
    accountable: Task[];

    @ManyToMany((type) => Task, (task) => task.subscribers)
    subscribers: Task[];

}