import Fastify from "fastify"
import {Server} from "./server.js"

const fastify = Fastify({logger: true})

const server = new Server(fastify)
server.RunServer(3000)