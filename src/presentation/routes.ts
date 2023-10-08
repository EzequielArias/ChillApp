import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MessageRoutes } from "./message/routes";
import { Server as SocketServer } from "socket.io";
import http from 'http';
import express from 'express';

export class AppRoutes {
    static get routes() : Router {
        const router = Router();

        // Define all main routes
        router.use("/auth", AuthRoutes.routes );

        router.use("/message", MessageRoutes.routes )

        return router;
    }

    static get sockets() : http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> {
        const app = express()
        const httpServer = http.createServer(app);
        const io = new SocketServer(httpServer, {
            cors : {
                origin : "http://localhost:5173/"
            }
        })

        io.on('connection', ( socket ) => {
            console.log('ENTRANDO AL SOCKET BACKEND');
        })
        // Tengo que retornar el httServer
        return httpServer
    }
}