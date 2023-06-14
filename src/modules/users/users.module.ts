import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.services';
import { UsersRepositoty } from './repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    controllers:[UsersController],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersRepositoty],
    exports: [UsersService],
})
export class UsersModule {}
