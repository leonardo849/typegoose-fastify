import { isEmail, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @MinLength(5)
    name: string;

    @IsEmail()
    email: string;
    constructor(email: string, name: string) {
        this.email = email
        this.name = name
    }
}

export class UpdateUserDTO{
    @IsOptional()
    @IsString()
    @MinLength(5)
    name?: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    constructor(email?: string, name?: string) {
        this.email = email
        this.name = name
    }
}

export class FindUserDTO {
    constructor(readonly id: string, readonly name: string, readonly email: string, readonly createdAt: Date, readonly updatedAt: Date) {

    }
}