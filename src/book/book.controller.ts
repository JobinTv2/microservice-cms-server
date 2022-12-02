import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { Observable } from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/form')
  getBookTradeForm(): Observable<string> {
    return this.bookService.getBookTradeForm();
  }

  @Get()
  getBook(): Observable<string> {
    return this.bookService.getBook();
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Observable<string> {
    return this.bookService.postBook(createBookDto);
  }
}
