import { DataSource, Repository } from "typeorm";
import { Project } from "../entities/projects.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectsRepository extends Repository<Project> {
    constructor(private dataSource: DataSource) {
        super(Project, dataSource.createEntityManager());
    }
}