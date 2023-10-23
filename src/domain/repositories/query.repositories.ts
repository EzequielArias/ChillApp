import { QueryDto } from "../dtos/query/query.dto";
import { QueryEntity } from "../entities/Query.entity";

export abstract class QueryRepository {
    abstract queryUser ( QueryDto : QueryDto ) : Promise<QueryEntity[]>
}