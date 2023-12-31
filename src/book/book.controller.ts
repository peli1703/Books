import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UsePipes()
  @Post('/')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  
  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/')
  findAll() {
    return this.bookService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @UsePipes()
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
