import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDB } from './database/connect.db';
const dotenv = require('dotenv');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const connectionUrl = process.env.CONNECTION_URL;
  // if (!connectionUrl) {
  //   throw new Error('CONNECTION_URL is not defined in environment variables');
  // }
  // await connectDB(connectionUrl);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
