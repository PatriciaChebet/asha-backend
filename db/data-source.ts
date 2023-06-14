import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const env: string | undefined = process.env.NODE_ENV;

const data: any = dotenv.parse(fs.readFileSync('.env'));

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: data['DB_HOST'],
    port: data['DB_PORT'],
    username: data['DB_USERNAME'],
    password: data['DB_PASSWORD'],
    database: data['DB_NAME'],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
