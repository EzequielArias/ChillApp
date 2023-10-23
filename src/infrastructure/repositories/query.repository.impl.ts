import { QueryDatasource, QueryEntity, QueryRepository } from "../../domain";
import { QueryDto } from "../../domain/dtos";


export class QueryRepositoryImpl implements QueryRepository {

    constructor(
        private readonly queryDatasource : QueryDatasource
    ){}

    queryUser(QueryDto: QueryDto): Promise<QueryEntity[]> {
        return this.queryDatasource.queryUser( QueryDto );
    }
    
}