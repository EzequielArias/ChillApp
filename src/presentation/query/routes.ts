import { Router } from "express";
import { QueryDatasourceImpl } from "../../infrastructure/datasources";
import { QueryRepositoryImpl } from "../../infrastructure/repositories";
import { QueryController } from "./controller";
import { AuthMiddleware } from "../middleware/app.middleware";

export class QueryRoutes {
    
    static get routes() : Router {
        const router = Router();

        const datasource = new QueryDatasourceImpl();
        const queryRepository = new QueryRepositoryImpl(datasource);
        const controller = new QueryController(queryRepository);

        router.get('/person', controller.getUsersByQuery );

        return router;
    }
} 