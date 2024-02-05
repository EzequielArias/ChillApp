import { Router } from "express";
import { ChillNewsDatasourceImpl, ChillNewsRepositoryImpl } from "../../infrastructure";
import { ChillNewsController } from "./controller";
import { AuthMiddleware } from "../middleware/app.middleware";

export class ChillNewsRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new ChillNewsDatasourceImpl();
        const repository = new ChillNewsRepositoryImpl(datasource);
        const controller = new ChillNewsController(
            repository
        );
        
        router.get('/', AuthMiddleware.validateJWT, controller.getRecommended );

        router.post('/', AuthMiddleware.validateJWT,controller.add );

        router.get('/:id', AuthMiddleware.validateJWT,controller.getOne );

        router.put('/:id', AuthMiddleware.validateJWT, controller.update );
        
        router.delete('/:id', AuthMiddleware.validateJWT, controller.remove );

        return router;
    }
}