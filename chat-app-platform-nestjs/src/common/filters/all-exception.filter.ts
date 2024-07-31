import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const logger = new Logger();
    logger.debug(JSON.stringify(exception));
    logger.debug(JSON.stringify(exception?.message));
    let httpStatus;
    try {
      httpStatus = exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    } catch (e) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception?.response?.message ?? exception?.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
