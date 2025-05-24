import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../service/user.service';
import { CreateNewUserDto } from '../dtos';
import { Response } from 'express';
import { HTTP_STATUS } from '../responses/constants';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn((dto: CreateNewUserDto) => ({
      _id: '232399585930',
      ...dto
    }))
  };

  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
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

    const res = mockResponse();
    await controller.create(res as Response, dto);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully',
      data: {
        _id: '232399585930',
        name: 'John Doe',
        email: 'JohnDoe@example.com',
        password: 'password@123'
      }
    });
  });
});
