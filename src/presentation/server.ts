import express, { Router } from 'express';
import http from 'http';
import { Server as SocketServer} from 'socket.io';

interface Options {
    port : number;
    routes : Router;
}

export class Server {
    
    public readonly app = express();
    private readonly port : number;
    private readonly routes : Router;
    private httpServer: http.Server;
    private io: SocketServer;

    constructor(options : Options)
    {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
        this.httpServer = http.createServer(this.app);
        this.io = new SocketServer(this.httpServer, {
            cors: {
                origin: "http://localhost:5173"
            }
        });
    }

    async start(){

        this.app.use(express.json() );
        this.app.use(express.urlencoded({ extended : true }) ); 

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port : ${this.port}`)
        })

        // No puedo colocar los sockets y rutas en el mismo puerto necesito crear server aislados

        this.httpServer.listen(5555, () => {
            console.log(`CONSOLOGUEANDO EL PUERTO 5555`);
        });

        this.io.on('connect', ( socket ) => {
            console.log(socket.id)
            console.log('CLIENTE CONECTADO')
        })
    }
}