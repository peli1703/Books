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
        message: "Failed create book data"
      }
    }
  }
    
  async findAll() {
    const book = await this.dbservice.book.findMany()
    if(book){
      return{
        status:200,
        massage:'success find book',
        data: book
      }
    }else{
      return{
        status:400,
        massage:'failed find book'
      }
    }
  }

  async findOne(id: number) {
    const book = await this.dbservice.book.findFirst({
      where : {id}
    })
    if(book){
      return{
        status:200,
        massage:'success find one book',
        data: book
      }
    }else{
      return{
        status:400,
        massage:'failed find one book'
      }
    }
  }

  async update(id: number, updateBookDto:UpdateBookDto) {
    const { name, author, category, title, description } = updateBookDto
    // console.log(updateBookDto)
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
    if(book){
      return{
        status:200,
        massage:'success update book',
        data : {
          book
        }
      }
    }else{
      return{
        status:400,
        massage:'failed update book'
      }
    }
  }

  async remove(id: number) {
    const book = await this.dbservice.book.delete({
      where:{id}
    })
    if(book){
      return{
        status:200,
        massage:'success delete book',
       
      }
    }else{
      return{
        status:400,
        massage:'failed delete book'
      }
    }
  }
}
