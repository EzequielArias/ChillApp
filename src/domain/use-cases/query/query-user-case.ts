import { QueryDto } from "../../dtos/query/query.dto";
import { QueryRepository } from "../../repositories";

interface QueryResults {

    id : string;
    name : string;
    email : string;
    img : string;

}

interface QueryUseCase {
    execute ( QueryDto : QueryDto ) : Promise<QueryResults[]>
}

export class QueryUser implements QueryUseCase {

    constructor(
        private readonly queryRepository : QueryRepository
    ){}

    async execute( QueryDto: QueryDto ): Promise<QueryResults[]> {
        
        const results = await this.queryRepository.queryUser( QueryDto )

        return results;
    }
    
}
