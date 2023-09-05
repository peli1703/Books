import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly dbservice:PrismaService){}
  async create(createBookDto: CreateBookDto) {
    try {
      const { name, author, category, title, description } = createBookDto

  const book = await this.dbservice.book.create({
    data:{
      name:name,
      author:author,
      category :category,
      title:title,
      description:description,
    }
  })
  return {
    status: HttpStatus.CREATED,
    message: "Success create book data"
  }

    } catch (error) {
      console.log(error.message)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Failed create book "
      }
    }
  }
    
  async findAll() {
    try {
      const book = await this.dbservice.book.findMany()
  return {
    status: HttpStatus.OK,
    message: "Success find book ",
    data : book 
  }
    } catch (error) {
      console.log(error.message)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Failed find book "
      }
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.dbservice.book.findFirst({
        where : {id}
      })
      return {
        status: HttpStatus.OK,
        message: "Success find book ",
        data:book
      }
    } catch (error) {
      console.log(error.message)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Failed find book "
      }
    }
    
  }

  async update(id: number, updateBookDto:UpdateBookDto) {
    try {
      const { name, author, category, title, description } = updateBookDto
      
      const book = await this.dbservice.book.update({
        where : {id},
        data: {
          name :name,
          author:author,
          category :category,
          title :title,
          description :description,
          updated_at : new Date()
        }
      })
      return {
        status: HttpStatus.CREATED,
        message: "Success update book data"
      }
    } catch (error) {
      console.log(error.message)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Failed update book "
      }
    }    
  }

  async remove(id: number) {

    try {
      const book = await this.dbservice.book.delete({
        where:{id}
      })
      return {
        status: HttpStatus.OK,
        message: "Success delete book data"
      }
    } catch (error) {
      console.log(error.message)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Failed delete book "
      }
    }
  }
}
