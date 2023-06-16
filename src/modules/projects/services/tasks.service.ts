import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TasksRepository } from "../repositories/tasks.repository";
import { Task } from "../entities/tasks.entity";
import { Project } from "../entities/projects.entity";
import { User } from "../../users/entities/user.entity";
import { UsersService } from "../../users/services/users.services";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository, private usersService: UsersService){}

    async getAllTasks(): Promise<Task[]> {
        return await this.tasksRepository.createQueryBuilder("task")
        .leftJoinAndSelect("task.tags", "tags")
        .leftJoinAndSelect("task.project", "project")
        .leftJoinAndSelect("task.owners", "owners")
        .leftJoinAndSelect("task.accountable", "accountable")
        .leftJoinAndSelect("task.subscribers", "subscribers")
        .select(['task.id', 'task.name', 'task.stage', 'tags.id', 
        'project.id', 'owners.id', 'owners.type', 'accountable.id', 
        'subscribers.id'])
        .getMany(); 
    }

    async getUserById(id: number): Promise<User> {
        return await this.usersService.findUserById(id);
    }

    async filterAccountableUsers(task): Promise<User[]>{
        let newAccountableUsers = [];
        for (let accountableUser of task.accountable){
            const accountableId = accountableUser.id;
            const returnedUser = await this.getUserById(accountableId);
            if (returnedUser.type === "user"){
                newAccountableUsers.push(returnedUser);
            }
        }
        return newAccountableUsers;
    }

    async filterSubscribers(task): Promise<User[]>{
        let newSubscribers = [];
        for (let subscriber of task.subscribers){
            const subscriberId = subscriber.id;
            const returnedSubscriber = await this.getUserById(subscriberId);
            if (returnedSubscriber.type === "user"){
                newSubscribers.push(returnedSubscriber);
            }
        }
        return newSubscribers;
    }
    

    async createTask(task: CreateTaskDto, project: Project): Promise<Task> {
        try {
            const newTask =  await this.tasksRepository.save({
                name: task.name,
                stage: task.stage,
                tags: task.tags,
                owners: task.owners,
                accountable: await this.filterAccountableUsers(task),
                subscribers: await this.filterSubscribers(task)
            });
    
            project.tasks = [...project.tasks, newTask]
            await project.save();
    
            return newTask;  
        } catch (error) {
            throw new BadRequestException(
                'IDs of tags, owners, accountable and subscribers should be of existing users.', error);
        }
       
    }

    async getTaskById(id: number): Promise<Task> {
        return await this.tasksRepository.findOne({
            relations: ['tags', 'owners', 'accountable', 'subscribers'],
            where:{
                id: id
            }
        });
    }

    async updateTask(updateTask: UpdateTaskDto): Promise<Task> {
        
        try {
            const taskId = updateTask.id;
            if (!taskId) throw new BadRequestException();

            const taskToUpdate = await this.getTaskById(taskId);
            if (!taskToUpdate) throw new BadRequestException();

            const updated = Object.assign(taskToUpdate, updateTask);
            return await this.tasksRepository.save(updated);
        } catch (error) {
            throw new BadRequestException(
                'IDs of tags, owners, accountable and subscribers should be of existing users.', error);
        }
        
    }
}