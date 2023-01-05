import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter extends HttpException {
  constructor(public message: string, status: number) {
    super(message, status);
  }
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = this.getStatus();
    response.status(status).json({
      statusCode: status,
      message: this.message,
    });
  }
}
