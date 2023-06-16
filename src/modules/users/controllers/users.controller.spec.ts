import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.services';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
 
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
            provide: UsersService,
            useValue: {
              createUser: jest
                .fn()
                .mockImplementation((user: CreateUserDto) =>
                  Promise.resolve({ id: 1, ...user }),
                ),
            },
          },
      ],
    })
    .compile();

    usersController = app.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Create new user', () => {
    it('should create a new user', async () => {
      const newUserDto: CreateUserDto = {
        "type": "user",
        "name": "Doreen"
      };
      await expect(usersController.createUser(newUserDto)).resolves.toEqual({
        id: 1,
        ...newUserDto,
      });
    });
  });

});
