import { IsNotEmpty } from "class-validator";

export class CreateBookDto {
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
