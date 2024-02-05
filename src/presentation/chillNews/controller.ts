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

    getRecommended = ( req : Request, res : Response ) => {
        new ChillNew( this.chillNewsRepository )
        .getRecommended( req.body.session )
        .then(( data ) => {
            res.json(data)
        })
        .catch( (error) => {
            Logger.error(error)
            CustomErr.handleError(error, res)
        });
    }

    update = ( req : Request, res : Response ) => {

        const [ error, chillNewsDto ] = ChillNewsDto.create( req.body );

        const payload = { id : req.params.id, ChillNewsDto : chillNewsDto! }

        new ChillNew( this.chillNewsRepository )
        .update( payload )
        .then(( data ) => {
        if(error) throw error;
        res.json(data)
        })
        .catch( (error) => {
            Logger.error(error)
            CustomErr.handleError(error, res)
        });
        
    }
    getOne = ( req : Request, res : Response ) => {

        const { id } = req.params

        new ChillNew( this.chillNewsRepository )
        .getOne( id! )
        .then(( data ) => {
            res.json(data)
            })
            .catch( (error) => {
                Logger.error(error)
                CustomErr.handleError(error, res)
            });   
    }

    remove = ( req : Request, res : Response ) => {
        const { id } = req.params;

        new ChillNew( this.chillNewsRepository )
        .remove( id! )
        .then(( data ) => {
            res.json(data)
            })
            .catch( (error) => {
                Logger.error(error)
                CustomErr.handleError(error, res)
            });
    }
}