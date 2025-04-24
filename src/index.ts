import Fastify from "fastify"
import {Server} from "./server/server.js"
import sensible from '@fastify/sensible';

const fastify = Fastify()
await fastify.register(sensible)
const server = new Server(fastify)
server.RunServer(3000)