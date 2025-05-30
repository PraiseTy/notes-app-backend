import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
// import { AppExceptionFilter } from './middleware/error-handler';
const dotenv = require('dotenv');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // app.useGlobalFilters(new AppExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
