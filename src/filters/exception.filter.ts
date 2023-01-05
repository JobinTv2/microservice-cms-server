import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter extends HttpException {
  constructor(public message: string, status: number) {
    super(message, status);
  }
  catch(exception, host) {
    console.log(this.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = this.getStatus();
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: this.message,
    });
  }
}
