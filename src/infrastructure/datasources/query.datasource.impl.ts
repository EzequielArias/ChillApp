import { QueryDatasource } from "../../domain"
import { QueryDto } from "../../domain/dtos/query/query.dto";
import { QueryEntity } from "../../domain/entities/Query.entity";
import { UserModel } from "../../databases/mongodb";
import { QueryMapper } from "../mappers";


export class QueryDatasourceImpl implements QueryDatasource {

    async queryUser( QueryDto: QueryDto ): Promise<QueryEntity[]> {

        const { email, name } = QueryDto;

        if( email !== "null" && email )
        {
            const results = await UserModel.find({ email }).select('id name email img');
            
            return results.map((usrModel) => {
                return QueryMapper.queryEntityFromObject( usrModel );
            })
        }

        const results = await UserModel.find({ name }).select('id name email img');
        return results.map((usrModel) => {
            return QueryMapper.queryEntityFromObject( usrModel );
        })
        
    }
    
}