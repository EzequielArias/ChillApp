import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MessageRoutes } from "./message/routes";
import { QueryRoutes } from "./query/routes";
import { ChillNewsRoutes } from "./chillNews/routes";

export class AppRoutes {
    static get routes() : Router {
        const router = Router();

        // Define all main routes
        router.use("/auth", AuthRoutes.routes );

        router.use("/chat", MessageRoutes.routes );

        router.use('/search-bar', QueryRoutes.routes );

        router.use('/chill-news', ChillNewsRoutes.routes );

        return router;
    }

}