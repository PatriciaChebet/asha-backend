import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProjectsModule, UsersModule, ConfigModule.forRoot({isGlobal: true}), TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
