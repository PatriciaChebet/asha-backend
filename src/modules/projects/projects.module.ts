import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { ProjectsRepository } from './repositories/projects.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { TasksController } from './controllers/tasks.controller';
import { Task } from './entities/tasks.entity';
import { TasksService } from './services/tasks.service';
import { TasksRepository } from './repositories/tasks.repository';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [ProjectsController, TasksController],
    imports: [UsersModule, TypeOrmModule.forFeature([Project, Task])],
    providers: [ProjectsService, ProjectsRepository, TasksService, TasksRepository],
})
export class ProjectsModule {}
