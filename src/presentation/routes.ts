import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
    static get routes() : Router {
        const router = Router();

        // Define all main routes
        router.use("/auth", AuthRoutes.routes );

        return router;
    }
}