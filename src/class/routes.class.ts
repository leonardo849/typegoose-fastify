import { FastifyInstance } from "fastify";

export abstract class SetupRoutes {
    constructor(protected readonly app: FastifyInstance) {

    }
    abstract setupRoutes(): void;
}