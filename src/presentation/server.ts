import express, { Router } from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIo  } from 'socket.io';

interface Options {
    port : number;
    routes : Router;
}

export class Server {
    
    public readonly app = express();
    private readonly port : number;
    private readonly routes : Router;
    private readonly httpService : http.Server = http.createServer(this.app);
    private readonly io  = new SocketIo( this.httpService , {
        cors : {
            origin : "http://localhost:5173"
        }
    })

    constructor(options : Options)
    {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){

        this.app.use(express.json() );
        this.app.use(express.urlencoded({ extended : true }) ); 
        this.app.use(cors({
            origin : "http://localhost:5173"
        }));

        this.app.use(this.routes);
        
        this.app.listen(this.port, () => {
            console.log(`Server running on port : ${this.port}`)
        })


        this.io.on('connection', ( socket ) => {
            console.log(socket.id)

            socket.on('is-typing', ( data ) => {
                console.log("Del evento is Typing llego : \n" + data )
                return true
            })
        })

        this.io.listen(5555)
    }
}