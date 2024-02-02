import { ChillNewsDatasource, ChillNewsDto, ChillNewsEntity, ChillNewsRepository } from "../../domain";
import { ChillNewsDatasourceImpl } from "../datasources";


export class ChillNewsRepositoryImpl implements ChillNewsRepository {

    constructor(
        private readonly chillNewsDatasource : ChillNewsDatasource
    ){}

    add(ChillNewsDto: ChillNewsDto): Promise<ChillNewsEntity> {
        return this.chillNewsDatasource.add( ChillNewsDto );
    }

    
    
}