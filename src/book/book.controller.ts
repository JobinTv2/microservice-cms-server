import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseFilters,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Observable } from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-auth-guard';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('book')
@UseFilters(HttpExceptionFilter)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/form')
  getBookTradeForm() {
    return this.bookService.getBookTradeForm();
  }

  // @Get('/todos/:id')
  // getTodos(@Req() req): Observable<string> {
  //   const { id } = req.params;
  //   return this.bookService.getTodos(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  getBook(): Observable<string> {
    return this.bookService.getBook();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Observable<string> {
    return this.bookService.postBook(createBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/file')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './uploads/',
      }),
      //   fileFilter: imageFileFilter,
    }),
  )
  fileUploag(@UploadedFile() file) {
    return { status: 'Uploaded' };
    // return this.bookService.uploadFile(file);
  }
}
