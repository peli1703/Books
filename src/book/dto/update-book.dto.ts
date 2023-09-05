import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty } from "class-validator";


export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsNotEmpty()
    name : string;
    @IsNotEmpty()
    author : string;
    @IsNotEmpty()
    title : string;
    @IsNotEmpty()
    description : string;
    @IsNotEmpty()
    category : string;
}
