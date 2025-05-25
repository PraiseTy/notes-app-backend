import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../service/user.service';
import { CreateNewUserDto } from '../dtos';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn((dto: CreateNewUserDto) => ({
      id: '232399585930',
      ...dto
    }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user and return success message', async () => {
    const dto: CreateNewUserDto = {
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      password: 'password@123'
    };
    const result = await controller.create(dto);

    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      message: 'User created successfully',
      data: {
        id: '232399585930',
        name: 'John Doe',
        email: 'JohnDoe@example.com'
      }
    });
  });
});
