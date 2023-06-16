import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

describe('ProjectsController', () => {
  let projectsController: ProjectsController;
 
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
            provide: ProjectsService,
            useValue: {
                getAllProjects: jest.fn().mockResolvedValue([
                {
                    id: 1,
                    name: "Frontend", 
                    description: "Design the Frontend UI", 
                    tasks: [
                        {
                            id: 1,
                            stage: "backlog"
                        }
                      ]
                },
                { 
                    id: 2,
                    name: 'Projects Management API', 
                    description: 'Create all the endpoints of the api', 
                    tasks: [{
                        id: 2,
                        stage: "in-progress"
                    }]
                 },
              ]),
              createProject: jest
                .fn()
                .mockImplementation((project: CreateProjectDto) =>
                  Promise.resolve({ id: 1, ...project }),
                ),
              updateProject: jest
                .fn()
                .mockImplementation((project: CreateProjectDto) =>
                  Promise.resolve({ id: 2, ...project }),
                ),
            },
          },
      ],
    })
    .compile();

    projectsController = app.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(projectsController).toBeDefined();
  });

  describe('Retrieve all projects', () => {
    it('should get an array of projects', async () => {
      await expect(projectsController.getAllProjects()).resolves.toEqual([
        { 
            id: 1,
            name: "Frontend", 
            description: "Design the Frontend UI", 
            tasks: [
                {
                    id: 1,
                    stage: "backlog"
                }
              ]
        },
        {
            id: 2,
            name: 'Projects Management API', 
            description: 'Create all the endpoints of the api', 
            tasks: [{
                id: 2,
                stage: "in-progress"
            }]
        }
      ]);
    });
  });

  describe('Create new project', () => {
    it('should create a new project', async () => {
      const newProjectDto: CreateProjectDto = {
        name: 'Frontend',
        description: "Design the Frontend UI",
      };
      await expect(projectsController.createProject(newProjectDto)).resolves.toEqual({
        id: 1,
        ...newProjectDto,
      });
    });
  });

 describe('Update a project', () => {
    it('should update a project', async () => {
      const updatesProjectDto: UpdateProjectDto = {
        id: 1,
        name: 'Backend',
        description: "Design the Frontend UI"
      };
      await expect(projectsController.updateProject(updatesProjectDto)).resolves.toEqual({
        id: 1,
        ...updatesProjectDto,
      });
    });
  });

});
