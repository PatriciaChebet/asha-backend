import { BadRequestException, Injectable } from "@nestjs/common";
import { ProjectsRepository } from "../repositories/projects.repository";
import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../entities/projects.entity";

@Injectable()
export class ProjectsService{

    constructor(private projectRepository: ProjectsRepository){}

    async getAllProjects(): Promise<Project[]>{
        return await this.projectRepository.createQueryBuilder('project')
        .leftJoinAndSelect('project.tasks', 'tasks')
        .select(['project.id', 'project.name', 'project.description', 'tasks.id', 'tasks.stage'])
        .getMany()
    }

    async getProjectById(id: number): Promise<Project> {
        return await this.projectRepository.findOne({
            relations: ['tasks'],
            where:{
                id: id
            }
        });
    }

    async createProject(project: CreateProjectDto): Promise<Project>{
        return await this.projectRepository.save(project);
    }

    async updateProject(updateProject: Project): Promise<Project> {
        const projectId = updateProject.id;

        if (!projectId) throw new BadRequestException();
        
        const projectToUpdate = await this.getProjectById(projectId);

        if (!projectToUpdate) throw new BadRequestException();

        const updated = Object.assign(projectToUpdate, updateProject);
        return await this.projectRepository.save(updated);
    }

}