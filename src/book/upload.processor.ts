import { Processor, Process } from '@nestjs/bull';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Job } from 'bull';
import CsvToJson from 'csvtojson';
import { BookService } from './book.service';

@Processor('file-upload-queue')
export class UploadProcessor {
  private client: ClientProxy;
  constructor(private readonly bookService: BookService) {}

  @Process('csvfilejob')
  async processFile(job: Job) {
    const file = job.data.file;
    const filePath = file.path;
    const userData = await CsvToJson().fromFile(filePath);

    this.bookService.getBook();
    // const userCreated = await this.userService.createUser(input);
    // console.log('User created -');
  }
}

// @Process('csv')
// async handleCsvFiles(job: Job) {
//   console.log('hiiaaa');
//   const csvFilePath = process.cwd() + '/' + job.data.file.path;
//   const fileArray = await CsvToJson().fromFile(csvFilePath);
//   const result = await this.client.send<string, any[]>(
//     '/book/upload',
//     fileArray,
//   );
//   return result;
