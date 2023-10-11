import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MessageRoutes } from "./message/routes";


export class AppRoutes {
    static get routes() : Router {
        const router = Router();

        // Define all main routes
        router.use("/auth", AuthRoutes.routes );

        router.use("/chat", MessageRoutes.routes )

        return router;
    }

    static get sockets(){
        const socket : any = null;
        
        // Tengo que retornar el httServer
        return 
    }
}