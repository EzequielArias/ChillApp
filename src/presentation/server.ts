import express, { Router } from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIo  } from 'socket.io';
import { MessageSockets } from './message/sockets';
import { AppMiddleware } from './middleware/app.middleware';

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
    private users : { userId : string, socket_id : string }[] = []

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
        this.app.use(AppMiddleware.Log)

        this.app.use(this.routes);
        
        this.app.listen(this.port, () => {
            console.log(`Server running on port : ${this.port}`)
        })


        this.io.on('connection', ( socket ) => {
            
            socket.on('new user', ( { userId } ) => {          
                    const user = {
                        userId : userId,
                        socket_id : socket.id
                    }
                    this.users.push(user);
                    
                    this.io.emit('new user', this.users );
            })

            socket.on('send-msg', async ( data ) => {
                
                try {
                    const result : any = await this.msgSocket.sendMsg( data );

                    const receiver = this.users.find(el => el.userId === JSON.parse(result).message.owners[1]);
                    socket.to(receiver?.socket_id!).emit('receive-msg', JSON.stringify(result));
                   // socket.emit('receive-msg', JSON.stringify(result));
                    
                } catch (error) {

                    console.log(error)
                    
                }
            })

            socket.on('is-typing', ({ receiverId, typing }) => {
                
                const receiverSocketId = this.users.find((usr) => usr.userId === receiverId)?.socket_id
                if(receiverSocketId) socket.to(receiverSocketId).emit('is-typing', typing);
            })

            socket.on('logout', ( userId ) => {
                this.users = this.users.filter((usr) => usr.userId !== userId )
            })
        })

        this.io.listen(5555)
    }
}