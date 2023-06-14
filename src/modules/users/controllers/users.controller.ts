import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.services";
import { CreateUserDto } from "../dto/create-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/')
    @UsePipes(ValidationPipe)
    async createUser(@Body() userDetails: CreateUserDto): Promise<User>{
        return await this.usersService.createUser(userDetails);
    }
}