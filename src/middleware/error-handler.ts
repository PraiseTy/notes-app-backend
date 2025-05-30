// import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
//
// @Catch()
// export class AppExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const request = ctx.getRequest<Request>();
//     const res = ctx.getResponse<Response>();
//
//     const status = exception.getStatus();
//     const message = exception.getMessage();
//
//     res.status(status).json({
//       path: request.url,
//       message
//     });
//   }
// }
