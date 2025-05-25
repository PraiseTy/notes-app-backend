import { CreateNewUserDto } from './createNewUser.dto';
import { OmitType } from '@nestjs/mapped-types';

export class LoginUserDto extends OmitType(CreateNewUserDto, ['name'] as const) {}
