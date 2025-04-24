import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Database } from "../db/database.js";
import { UserRoutes } from "./user.routes.js";
import { HttpError } from "@fastify/sensible";


export class Server {
    private DB: Database = new Database()
    private userRoutes: UserRoutes
    constructor(private readonly app: FastifyInstance) {
        this.userRoutes = new UserRoutes(app)
    }
    async RunServer(port: number) {
        try {
            await this.DB.ConnectToDB()
            this.Routes()
            await this.app.listen({port: port, host:'0.0.0.0'})
            console.log(`server is running on port ${port}`)
        } catch(err) {
            this.app.log.error(err)
            process.exit(1)
        }
    }
    private Routes() {
        this.app.get("/", async(request, reply) => {
            return reply.code(200).send({"message": "hello world!"})
        })
        this.userRoutes.setupRoutes()
        this.app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
            if (error instanceof HttpError) {
              reply.status(error.statusCode || 500).send({
                error: error.message || "Internal Server Error"
              });
            } else {
              reply.status(500).send({
                error: error.message,
              });
            }
          });
        console.log("routes are working!")
    }
    
}