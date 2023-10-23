import { CustomErr, UserEntity } from "../../domain";

export class UserMapper {
    // This is a mapper from MongoEntity to a normal javascript object;
    static userEntityFromObject(object : {[key : string] : any}){

        const { id, _id, name , email, password, roles, img } = object;

        if(!_id || !id){
            throw CustomErr.badRequest('Missing ID');
        }

        if( !name ) throw CustomErr.badRequest('Missing name'); 

        if( !email ) throw CustomErr.badRequest('Missing email'); 

        if( !password ) throw CustomErr.badRequest('Missing password');

        if( !roles ) throw CustomErr.badRequest('Missing roles');

        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            roles,
            img 
        );
    }
}