import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TasksController E2E test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test
        .createTestingModule({
            imports:[AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Retrieve all tasks GET /tasks', () => {
        const GET_ALL_TASKS_URL = '/tasks'
        it('should return an array of tasks', () => {
            return request(app.getHttpServer())
            .get(GET_ALL_TASKS_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        });
    });

    describe('Create a new Task POST /tasks', () => {
        const CREATE_TASKS_URL = '/tasks'
        it('should create a new task', () => {
            return request(app.getHttpServer())
            .post(CREATE_TASKS_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                name: "Develop a workplan",
                stage: "backlog",
                projectId: 1,
                tags: [
                        {
                            id: 1
                        }
                    ],
                owners: [
                        {
                            id: 2
                        }
                ],
                accountable: [
                        {
                            "id": 1
                        }
                ],
                subscribers: [
                        {
                            "id": 1
                        }
                ]   
            })
            .expect(201);
        });

        it('should return a 400 when invalid name', () => {
            return request(app.getHttpServer())
            .post(CREATE_TASKS_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                name: "P",
                stage: "backlog",
                projectId: 1,
                tags: [
                        {
                            id: 1
                        }
                    ],
                owners: [
                        {
                            id: 2
                        }
                ],
                accountable: [
                        {
                            "id": 1
                        }
                ],
                subscribers: [
                        {
                            "id": 1
                        }
                ]
            })
            .expect(400);
        });
    });

    describe('Update a Task PUT /tasks', () => {
        const UPDATE_TASK_URL = '/tasks'
        it('should update a  task', () => {
            return request(app.getHttpServer())
            .post(UPDATE_TASK_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                id: 3,
                name: "Develop a strategic pla",
                stage: "backlog",
                projectId: 1,
                tags: [
                        {
                            id: 1
                        }
                    ],
                owners: [
                        {
                            id: 2
                        }
                ],
                accountable: [
                        {
                            "id": 1
                        }
                ],
                subscribers: [
                        {
                            "id": 1
                        }
                ]   
            })
            .expect(201);
        });

        it('should return a 400 when invalid name', () => {
            return request(app.getHttpServer())
            .post(UPDATE_TASK_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                id: 3,
                name: "W",
                stage: "backlog",
                projectId: 1,
                tags: [
                        {
                            id: 1
                        }
                    ],
                owners: [
                        {
                            id: 2
                        }
                ],
                accountable: [
                        {
                            "id": 1
                        }
                ],
                subscribers: [
                        {
                            "id": 1
                        }
                ]   
            })
            .expect(400);
        });
    });
 
});