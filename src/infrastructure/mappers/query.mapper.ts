import { CustomErr, QueryEntity } from "../../domain";


export class QueryMapper {

    static queryEntityFromObject(object : {[key : string] : any}){

        const { id, _id, name , email, img } = object;

        if(!id || !_id){
            throw CustomErr.badRequest('Missing ID')
        }

        if( !name ) throw CustomErr.badRequest('Missing name'); 

        if( !email ) throw CustomErr.badRequest('Missing email'); 

        if( !img ) throw CustomErr.badRequest('Missing img');
        
        return new QueryEntity(
            id,
            name,
            email,
            img
        )
    }
}