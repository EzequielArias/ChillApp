import { QueryDto } from "../dtos/query";
import { QueryEntity } from "../entities/Query.entity";


export abstract class QueryDatasource {
    abstract queryUser ( QueryDto : QueryDto) : Promise<QueryEntity[]>;
}