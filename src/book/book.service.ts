import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  getBookTradeForm() {
    return this.client.send<string, string>('book', 'Test').pipe();
  }

  getBook() {
    return this.client.send<string, string>('db/book/get', 'test').pipe();
  }

  getTodos(id: string) {
    return this.client.send<string, string>('book/todos', id).pipe();
  }

  postBook(createBookDto) {
    return (
      this, this.client.send<string, CreateBookDto>('db/book', createBookDto)
    );
  }
}
