// app.module.ts
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format((info) => {
              info.level = info.level.toUpperCase();
              return info;
            })(),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context }) => {
              const contextStr = context ? JSON.stringify(context) : '';
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              return `${timestamp} [${level}]${context ? ` [${contextStr}]` : ''}: ${message}`;
            })
          )
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error'
        })
      ]
    })
  ]
})
export class LoggerModule {}
