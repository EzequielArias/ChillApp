import { Router } from "express";
import { MessageDatasourceImpl } from "../../infrastructure/datasources/msg.datasource.impl";
import { MessageRepositoryImpl } from "../../infrastructure/repositories/msg.repository.impl";
import { MessageController } from "./controller";
import { AuthMiddleware } from "../middleware/app.middleware";

export class MessageRoutes {

    static get routes() : Router {
        const router = Router();

        const datasource = new MessageDatasourceImpl();
        const messageRepository = new MessageRepositoryImpl( datasource );
        const controller = new MessageController(
            messageRepository
        )

        router.post('/send-msg', controller.sendMsg)

        router.get('/get-chats', AuthMiddleware.validateJWT ,controller.getChats)

        return router;
    }

}