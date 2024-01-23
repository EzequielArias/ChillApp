import { Response } from "express";
import { MongoError } from "mongodb";
import fs from 'fs';

interface ErrorLogs {
    errors : { timestamp : string, message : string}[]
}

export class CustomErr extends Error {
    constructor(
        public readonly statusCode : number,
        public readonly message : string
    ){
        super(message)
    }

    static badRequest(message : string){
        return new CustomErr( 400, message)
    }

    static unAuthorized(message : string){
        return new CustomErr(401, message);
    }

    static forbbiden(message : string){
        return new CustomErr(403, message);
    }

    static notFound(message : string){
        return new CustomErr(404, message);
    }

    static internalServerError(message : string = `Something went wrong`){
        return new CustomErr(500, message);
    }

    static handleError = (error : unknown, res : Response) => {

        if(error instanceof CustomErr)
        {
            const path = "/../../infrastructure/logs/custom-error.error.json";
            const json = fs.readFileSync(__dirname + path, 'utf-8');
            let objJson : ErrorLogs = JSON.parse(json);

            objJson.errors.push({
                timestamp : new Date().toLocaleDateString('es-Es', {
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute : '2-digit'
                }),
                message : `${error}`
            })

            fs.writeFileSync(__dirname + path, JSON.stringify(objJson), 'utf-8');

            return res.status(error.statusCode).json({ error : error.message });
        }

        if(error instanceof MongoError){
            // Validar con if las intancias de error que quiero que se muestren y las que no.
            const path = "/../../infrastructure/logs/mongodb-logs.error.json";
            const json = fs.readFileSync(__dirname + path, 'utf-8');
            let objJson : ErrorLogs = JSON.parse(json);

            objJson.errors.push({
                timestamp : new Date().toLocaleDateString('es-Es', {
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute : '2-digit'
                }),
                message : `${error}`
            })

            fs.writeFileSync(__dirname + path, JSON.stringify(objJson), 'utf-8');

            return res.status(500).json({ message : "Something went wrong"});
        }

        const path = "/../../infrastructure/logs/business-logic.error.json";
            const json = fs.readFileSync(__dirname + path, 'utf-8');
            let objJson : ErrorLogs = JSON.parse(json);

            objJson.errors.push({
                timestamp : new Date().toLocaleDateString('es-Es', {
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute : '2-digit'
                }),
                message : `${error}`
            })

        fs.writeFileSync(__dirname + path, JSON.stringify(objJson), 'utf-8');

        return res.status(500).json({ error : 'Internal Server Error'});
    }
}