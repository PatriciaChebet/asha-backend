import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.services";
import { CreateUserDto } from "../dto/create-user.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/')
    @ApiCreatedResponse({
        description: "The user has been created successfully.",
        type: User
    })
    @ApiBadRequestResponse({
        description: "User could not be created. Try again!"
    })
    @UsePipes(ValidationPipe)
    async createUser(@Body() userDetails: CreateUserDto): Promise<User>{
        return await this.usersService.createUser(userDetails);
    }
}