import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty() @IsString() username?: string;
    @IsNotEmpty() @IsString() email?: string;
    @IsNotEmpty() @IsString() password?: string;
    @IsNotEmpty() @IsString() full_name?: string;
}