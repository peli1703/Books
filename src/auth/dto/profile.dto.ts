import { IsNotEmpty, IsString } from "class-validator";
import { Role } from '../interfaces/user.interfaces';

export class ProfileDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly role: Role;
}