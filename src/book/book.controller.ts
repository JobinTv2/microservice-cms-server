import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { Observable } from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-auth-guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/form')
  getBookTradeForm(): Observable<string> {
    return this.bookService.getBookTradeForm();
  }

  @Get('/todos/:id')
  getTodos(@Req() req): Observable<string> {
    const { id } = req.params;
    return this.bookService.getTodos(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getBook(): Observable<string> {
    return this.bookService.getBook();
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Observable<string> {
    return this.bookService.postBook(createBookDto);
  }
}
