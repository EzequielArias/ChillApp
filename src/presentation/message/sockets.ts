import { MessageDatasourceImpl } from "../../infrastructure/datasources/msg.datasource.impl";
import { MessageRepositoryImpl } from "../../infrastructure/repositories/msg.repository.impl";
import { MessageController } from "./controller";



export class MessageSockets {

    get sockets () {

        const datasource = new MessageDatasourceImpl();
        const messageRepository = new MessageRepositoryImpl( datasource );
        const controller = new MessageController(
            messageRepository
        )

        return controller;
    }
}