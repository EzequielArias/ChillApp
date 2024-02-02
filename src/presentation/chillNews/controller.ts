import { ChillNewsRepository, ChillNewsDto, ChillNew, CustomErr } from "../../domain";
import { Request, Response } from "express";
import { Logger } from "../utils/Logger";

export class ChillNewsController {
    constructor(
        private readonly chillNewsRepository : ChillNewsRepository
    ){}

    add = ( req : Request, res : Response ) => {

        const [ error, chillNewsDto ] = ChillNewsDto.create( req.body );

        new ChillNew( this.chillNewsRepository )
            .add( chillNewsDto! )
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