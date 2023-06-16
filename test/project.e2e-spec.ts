import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProjectsController E2E test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test
        .createTestingModule({
            imports:[AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Retrieve all projects GET /projects', () => {
        const GET_ALL_PROJECTS_URL = '/projects'
        it('should return an array of projects', () => {
            return request(app.getHttpServer())
            .get(GET_ALL_PROJECTS_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        });
    });

    describe('Create a new Project POST /projects', () => {
        const CREATE_PROJECT_URL = '/projects'
        it('should create a new project', () => {
            return request(app.getHttpServer())
            .post(CREATE_PROJECT_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                name: "Design Hackthon Documentation",
                description: "Details collected about the hackathon"
            })
            .expect(201);
        });

        it('should return a 400 when invalid name', () => {
            return request(app.getHttpServer())
            .post(CREATE_PROJECT_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                name: 2,
                description: "CO"
            })
            .expect(400);
        });
    });

    describe('Update a Project PUT /projects', () => {
        const UPDATE_PROJECT_URL = '/projects'
        it('should update a  project', () => {
            return request(app.getHttpServer())
            .post(UPDATE_PROJECT_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                name: "Design Hackthon Documentation",
                description: "Details collected about the hackathon"
            })
            .expect(201);
        });

        it('should return a 400 when invalid name', () => {
            return request(app.getHttpServer())
            .post(UPDATE_PROJECT_URL)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                name: 2,
                description: "CO"
            })
            .expect(400);
        });
    });

    afterAll(async () => {
        await app.close();
      });
});