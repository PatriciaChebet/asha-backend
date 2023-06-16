import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TasksService } from "../services/tasks.service";
import { Task } from "../entities/tasks.entity";
import { ProjectsService } from "../services/projects.service";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateTaskDto } from "../dto/update-task.dto";

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService, private projectsService: ProjectsService){}

    @Get('/')
    @ApiOkResponse({
        description: "Retrieves all Tasks.",
    })
    @HttpCode(HttpStatus.OK)
    async getAllTasks(): Promise<Task[]> {
        return await this.tasksService.getAllTasks();
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({
        description: "The task has been created successfully.",
        type: Task
    })
    @ApiBadRequestResponse({
        description: "Task could not be created. Try again!"
    })
    @HttpCode(HttpStatus.CREATED)
    async createTask(@Body() taskDetails: CreateTaskDto): Promise<Task>{
        const project = await this.projectsService.getProjectById(taskDetails.projectId);
        return await this.tasksService.createTask(taskDetails, project);
    }

    @Put('/')
    @ApiOkResponse({
        description: "The task has been update successfully.",
        type: Task
    })
    @ApiBadRequestResponse({
        description: "Task could not be updated. Try again!"
    })
    @HttpCode(HttpStatus.OK)
    async updateTask(@Body() updateTaskDetails: UpdateTaskDto) {
        return await this.tasksService.updateTask(updateTaskDetails);
    }

}