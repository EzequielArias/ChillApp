import { CustomErr, QueryRepository, QueryDto, QueryUser } from "../../domain";
import { Response, Request } from 'express';

export class QueryController {

    constructor(
        private readonly queryRepository : QueryRepository
    ){}

    private handleError = (error : unknown, res : Response) => {
        if(error instanceof CustomErr)
        {
            return res.status(error.statusCode).json({ error : error.message });
        }
        /**
            Hay que agregar un user logger como winston.
            Para tener una base de datos con registros de errores
         */
        console.log(error)
        return res.status(500).json({ error : 'Internal Server Error'});
    }

    getUsersByQuery = (req : Request , res : Response) => {

        const [ error, queryDto ] = QueryDto.create( req.query );
        if( error ) res.status(400).json({ error })

        new QueryUser(this.queryRepository)
        .execute( queryDto!)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res))
    }
}