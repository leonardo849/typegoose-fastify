import { FastifyInstance } from "fastify";
import { Database } from "./db/database.js";

export class Server {
    private DB: Database = new Database()
    constructor(private readonly fastify: FastifyInstance) {

    }
    async RunServer(port: number) {
        try {
            await this.DB.ConnectToDB()
            this.Routes()
            await this.fastify.listen({port: port, host:'0.0.0.0'})
            console.log(`server is running on port ${port}`)
        } catch(err) {
            this.fastify.log.error(err)
            process.exit(1)
        }
    }
    private Routes() {
        this.fastify.get("/", async(request, reply) => {
            return reply.code(200).send({"message": "hello world!"})
        })

        console.log("routes are working!")
    }
}