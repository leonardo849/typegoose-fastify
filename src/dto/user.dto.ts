import { IsEmail, IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
    constructor(email: string, name: string) {
        this.email = email
        this.name = name
    }
}