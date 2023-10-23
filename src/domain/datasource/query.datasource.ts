import { QueryDto } from "../dtos/query/query.dto";
import { QueryEntity } from "../entities/Query.entity";


export abstract class QueryDatasource {
    abstract queryUser ( QueryDto : QueryDto) : Promise<QueryEntity[]>
}