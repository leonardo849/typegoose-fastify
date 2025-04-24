import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto.js";
import { UserService } from "../services/user.service.js";

interface RouteParams {
    id: string
}

export class UserController {
    constructor(app: FastifyInstance) {
        this.userService = new UserService(app)
    }
    userService: UserService 
    async CreateOneUser(request: FastifyRequest, reply: FastifyReply) {
        const body: CreateUserDTO = request.body as CreateUserDTO
        try {
            await this.userService.CreateOneUser(body);  
            reply.status(201).send({ message: "User was created!"});
        } catch (err) {
            throw err
        }
    }
    async FindAllUsers(request: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await this.userService.FindAllUsers()
            reply.status(200).send(users)
        } catch (err) {
            throw err
        }
    }
    async FindOneUser(request: FastifyRequest<{Params: RouteParams}>, reply: FastifyReply) {
        const id = request.params.id
        try {
            
            const user = await this.userService.FindOneUser(id)
            reply.status(200).send(user)
        } catch (err) {
            throw err
        }
    }
    async UpdateOneUser(request: FastifyRequest<{Params: RouteParams}>, reply: FastifyReply) {
        const id = request.params.id
        const body: UpdateUserDTO = request.body as UpdateUserDTO
        try {
            await this.userService.UpdateOneUser(id, body)
            reply.status(200).send({message: "user was updated"})
        } catch (err) {
            throw err
        }
    }
    async DeleteOneUser(request: FastifyRequest<{Params: RouteParams}>, reply: FastifyReply) {
        const id = request.params.id
        try {
            await this.userService.DeleteOneUser(id)
            reply.status(200).send({message: "user was deleted"})
        } catch (err) {
            throw err
        }
    }
}