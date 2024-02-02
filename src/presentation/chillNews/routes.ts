import { Router } from "express";
import { ChillNewsDatasourceImpl, ChillNewsRepositoryImpl } from "../../infrastructure";
import { ChillNewsController } from "./controller";


export class ChillNewsRoutes {

    
    static get routes() : Router {

        const router = Router();

        const datasource = new ChillNewsDatasourceImpl();
        const repository = new ChillNewsRepositoryImpl(datasource);
        const controller = new ChillNewsController(
            repository
        )
        
        router.post('/', controller.add );

        return router;
    }
}