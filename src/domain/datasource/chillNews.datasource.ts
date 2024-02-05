import { ChillNewsDto } from "../dtos";
import { ChillNewsEntity } from "../entities";
import { ISessionPayload, IChillNewsUpdateData } from "../interfaces";

export abstract class ChillNewsDatasource {
    
    abstract add ( ChillNewsDto : ChillNewsDto ) : Promise<ChillNewsEntity>;

    // Both gets (and remove) don't receive params because they dont need it for bring data
    abstract getRecommended ( ISessionPayload : ISessionPayload ) : Promise<ChillNewsEntity[]>;

    abstract getOne ( id : string ) : Promise<ChillNewsEntity>;

    abstract update ( payload : IChillNewsUpdateData ) : Promise<ChillNewsEntity>;

    abstract remove ( id : string ) : Promise<void>;
}