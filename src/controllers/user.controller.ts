import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserDTO } from "../dto/user.dto";

export class UserController {
    async GetAll(request: FastifyRequest, reply: FastifyReply) {
        const body: CreateUserDTO = request.body

        const 
    }
}