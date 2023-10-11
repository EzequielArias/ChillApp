import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../config";
import { UserModel } from "../../databases/mongodb";

export class AuthMiddleware {

    static validateJWT = async (req : Request, res : Response, next : NextFunction) => {


        const authorization = req.header('Authorization');

        if( !authorization) return res.status(400).json({ error : 'No token provided'});
        if( !authorization.startsWith('Bearer') ) return res.status(400).json({ error : 'Invalid Bearer Token'});

        const token = authorization.split(' ').at(1) || "";

        try{

        const payload = await Jwt.validateToken<{ id : string }>(token);

        if( !payload ) return res.status(400).json({ error : 'Invalid Token'});


        const user = await UserModel.findById(payload.id);
        if( !user ) return res.status(401).json({ error : 'Credentials Invalid'})
        req.body.user = user;
        next();

        }catch(err){
            console.log(err)
            res.status(500).json({ error : 'Internal Server Error'});
        }

    }
}