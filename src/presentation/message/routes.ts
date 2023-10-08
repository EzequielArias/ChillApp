import { Router } from "express";
import { MessageDatasourceImpl } from "../../infrastructure/datasources/msg.datasource.impl";
import { MessageRepositoryImpl } from "../../infrastructure/repositories/msg.repository.impl";
import { MessageController } from "./controller";
import { Server as SocketIo } from "socket.io";

// Hay que implementar los sockets

export class MessageRoutes {

    static get routes() : Router {
        const router = Router();

        const datasource = new MessageDatasourceImpl();
        const messageRepository = new MessageRepositoryImpl( datasource );
        const controller = new MessageController(
            messageRepository
        )

        router.post('/send', controller.sendMsg)

        return router;
    }

    // Es posible utilizar io.use como app.use con similares funcionalidades
    static get sockets() : any{
        const io = new SocketIo()

        io.on('connection', (socket) => {
            console.log(socket)
            console.log('BACKEND SOCKET')
        })
        return io;
    }
}