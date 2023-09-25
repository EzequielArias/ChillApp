import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED

export class Jwt {

    static generateToken( 
        payload : Object, 
        duration : string = '2h'
        ) : Promise<string | null> {
            // TODO :generate SEED
        return new Promise((resolve) => {
            jwt.sign( payload, JWT_SEED , { expiresIn : duration } , (err, token) => {
                if( err ) resolve(null)
                resolve(token as string)
            })
        })
    }

    static validateToken<T>(Token : string) : Promise<T | null>{

        return new Promise((resolve) => {
            jwt.verify(Token, JWT_SEED , (err, decoded) => {
                if( err ) return resolve(null);
                resolve(decoded as T);
            })
        })
    }
 
}
