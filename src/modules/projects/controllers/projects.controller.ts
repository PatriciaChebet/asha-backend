import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/projects.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { UpdateProjectDto } from '../dto/update-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('/')
  @ApiOkResponse({
    description: "Retrieves all projects.",
  })
  @HttpCode(HttpStatus.OK)
  async getAllProjects(): Promise<Project[]> {
    return await this.projectsService.getAllProjects();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: "The project has been successfully created.",
    type: Project
  })
  @ApiBadRequestResponse({
    description: "Project could not be created. Try again!"
  })
  @HttpCode(HttpStatus.CREATED)
  async createProject(@Body() projectDetails: CreateProjectDto): Promise<Project>{
    return await this.projectsService.createProject(projectDetails);
  }

  @Put('/')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: "The project has been successfully updated.",
    type: Project
  })
  @ApiBadRequestResponse({
    description: "Project could not be updated. Try again!"
  })
  @HttpCode(HttpStatus.OK)
  async updateProject(@Body() updateDetails: UpdateProjectDto) {
    return await this.projectsService.updateProject(updateDetails);
  }
 
}
