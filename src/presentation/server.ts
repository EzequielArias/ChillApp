import express, { Router } from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIo  } from 'socket.io';
import { MessageSockets } from './message/sockets';
import { Socket } from 'dgram';

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
    private readonly msgSocket = new MessageSockets().sockets

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
            
            const userId = socket.id

            socket.join(userId)

            socket.on('is-typing', ( data ) => {
                //console.log("Del evento is Typing llego : \n" + data )
                console.log(data)
                
                if(data){
                    socket.emit('is-typing', true)
                    return
                }

                socket.emit('is-typing', false)
                
            })

            socket.on('send-msg', async ( data ) => {
                
                try {

                    const result = await this.msgSocket.sendMsg( data );

                    socket.emit('receive-msg', JSON.stringify(result))

                } catch (error) {

                    console.log(error)
                    
                }
            })
        })

        this.io.listen(5555)
    }
}