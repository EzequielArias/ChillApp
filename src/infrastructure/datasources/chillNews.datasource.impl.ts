import { ChillNewsDatasource, ChillNewsDto, ChillNewsEntity, CustomErr } from "../../domain";
import { chillNewsModel } from "../../databases/mongodb";

export class ChillNewsDatasourceImpl implements ChillNewsDatasource {

    constructor(){}
    // ChillNewsEntity[]
    async add ( ChillNewsDto: ChillNewsDto ): Promise<any> {
        const { userId, avatar, chillNewContent } = ChillNewsDto;

       try {
         const newChillNews = await chillNewsModel.create({
             userId : userId,
             avatar : avatar,
             content : chillNewContent
         })
 
         return newChillNews
       } catch (error) {
        if(error instanceof CustomErr){
            throw error;
        }

        throw CustomErr.internalServerError();
       }
    }
    
}