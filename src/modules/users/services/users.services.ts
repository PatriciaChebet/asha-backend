import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersRepositoty } from "../repositories/users.repository";

@Injectable()
export class UsersService {

    constructor(private usersRepository: UsersRepositoty){}

    async findUserById(id: number): Promise<User>{
        return await this.usersRepository.findOne({
            //relations: ['quiz', 'options'],
            where: {
                id: id
            }
        });
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return await this.usersRepository.save(user);
    }

}