import { CustomErr, QueryRepository, QueryDto, QueryUser } from "../../domain";
import { Response, Request } from 'express';
import { Logger } from "../utils/Logger";

export class QueryController {
    constructor(
        private readonly queryRepository : QueryRepository
    ){}

    getUsersByQuery = (req : Request , res : Response) => {

        const [ error, queryDto ] = QueryDto.create( req.query );

        new QueryUser(this.queryRepository)
        .execute( queryDto!)
        .then(( data ) => {
            if(error) throw error;
            res.json(data)
        })
        .catch( (error) => {
            Logger.error(error)
            CustomErr.handleError(error, res)
        });
    }
}