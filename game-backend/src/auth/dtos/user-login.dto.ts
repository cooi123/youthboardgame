import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The team of the user',
        example: 'team1',
    })
    readonly name!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'password123',
        description: 'Password of the user',
    })
    readonly password!: string;
}