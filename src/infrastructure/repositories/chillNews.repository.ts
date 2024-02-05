import { ChillNewsDatasource, ChillNewsDto, ChillNewsEntity, ChillNewsRepository,IChillNewsUpdateData } from "../../domain";
import { ISessionPayload } from "../../domain/interfaces";

export class ChillNewsRepositoryImpl implements ChillNewsRepository {

    constructor(
        private readonly chillNewsDatasource : ChillNewsDatasource
    ){}

    getRecommended ( ISessionPayload : ISessionPayload ): Promise<ChillNewsEntity[]> {
        return this.chillNewsDatasource.getRecommended(ISessionPayload);
    }

    getOne( id : string ): Promise<ChillNewsEntity> {
        return this.chillNewsDatasource.getOne(id);
    }

    update( payload : IChillNewsUpdateData): Promise<ChillNewsEntity> {
        return this.chillNewsDatasource.update( payload );
    }

    remove(id : string ): Promise<void> {
        return this.chillNewsDatasource.remove(id);
    }

    add(ChillNewsDto: ChillNewsDto): Promise<ChillNewsEntity> {
        return this.chillNewsDatasource.add( ChillNewsDto );
    }

    
    
}