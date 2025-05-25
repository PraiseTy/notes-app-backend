import { Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export abstract class BaseService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) protected readonly logger: LoggerService) {}
}
