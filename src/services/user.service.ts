import { plainToInstance } from "class-transformer";
import { CreateUserDTO, FindUserDTO, UpdateUserDTO } from "../dto/user.dto.js";
import { UserModel  } from "../models/user.model.js";
import { validate } from "class-validator";
import fastify, { FastifyInstance } from "fastify";

export class UserService {
    constructor(private readonly app: FastifyInstance) {
        
    }
    private userRepository = UserModel
    
    async CreateOneUser(body: CreateUserDTO) {
        const dto = plainToInstance(CreateUserDTO, body);
        const errors = await validate(dto)
        if (errors.length > 0) {
            throw this.app.httpErrors.badRequest(`errors: ${errors}`)
        }

        const user = await this.userRepository.findOne({email: dto.email})
        if (user) {
            throw this.app.httpErrors.badRequest("A user already has that email")
        }

        const newUser = new UserModel({name: dto.name, email: dto.email})
        return await newUser.save()
    }
    async FindAllUsers() {
        return (await this.userRepository.find()).map(element => new FindUserDTO(element.id, element.name, element.email, element.createdAt, element.updatedAt))
    }
    async FindOneUser(id: string) {
        const user = await this.userRepository.findById(id)
        if (!user) {
            throw this.app.httpErrors.notFound("user wasn't found")
        }
        return new FindUserDTO(user.id, user.name, user.email, user.createdAt, user.updatedAt)
    }
    async UpdateOneUser(id: string, body: UpdateUserDTO) {
        await this.FindOneUser(id)
        const dto = plainToInstance(UpdateUserDTO, body);
        const errors = await validate(dto)
        if (errors.length > 0) {
            throw this.app.httpErrors.badRequest(`errors: ${errors}`)
        }

        this.userRepository.findByIdAndUpdate(id, body)

        return {
            message: "user was updated"
        }
    }
    async DeleteOneUser(id: string) {
        await this.FindOneUser(id)
        await this.userRepository.findByIdAndDelete(id)
        return {
            message: "user was deleted"
        }
    }
}