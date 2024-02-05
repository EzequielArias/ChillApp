import { ChillNewsDatasource, ChillNewsDto, ChillNewsEntity, CustomErr, IChillNewsUpdateData } from "../../domain";
import { chillNewsModel } from "../../databases/mongodb";
import { ChillNewsMapper } from "../mappers";

export class ChillNewsDatasourceImpl implements ChillNewsDatasource {

    constructor(){}

    // I have to add logic for only get ChillNews from friends and not outdated posts.
    // also create a alert when new posts from friends have been uploaded.
    async getRecommended(): Promise<ChillNewsEntity[]> {
        try {
            const recommendedChillNews = await chillNewsModel.find({});

            return ChillNewsMapper.multipleChillNewsMapper( recommendedChillNews );
        } catch (error) {
            throw error
        }
    }

    async getOne( id : string ) : Promise<ChillNewsEntity> {
        try {
            const chillNews = await chillNewsModel.findById(id).exec();

            if(!chillNews) throw CustomErr.badRequest('No se encontro el posts');

            return ChillNewsMapper.singleChillNewsMapper( chillNews );
        } catch (error) {
            if(error instanceof CustomErr){
                throw error;
            }
    
            throw CustomErr.internalServerError();
        }
    }
    async update( payload: IChillNewsUpdateData): Promise<ChillNewsEntity> {
        try {
            const updatedChillNews = await chillNewsModel.updateOne({ _id : payload.id }, payload.ChillNewsDto );

            if(!updatedChillNews) throw CustomErr.badRequest('No se encontre la chillNews');

            return ChillNewsMapper.singleChillNewsMapper( updatedChillNews as any );
        } catch (error) {
            if(error instanceof CustomErr){
                throw error;
            }
    
            throw CustomErr.internalServerError();
        }
    }
    
    
    async remove( id : string ): Promise<void> {
        try {
            await chillNewsModel.deleteOne({ _id : id});

            return 
        } catch (error) {
            if(error instanceof CustomErr){
                throw error;
            }
    
            throw CustomErr.internalServerError();
        }
    }

    async add ( ChillNewsDto: ChillNewsDto ): Promise<any> {
        const { userId, avatar, chillNewContent } = ChillNewsDto;

       try {
         const newChillNews = await chillNewsModel.create({
             userId : userId,
             avatar : avatar,
             content : chillNewContent
         })
 
         await newChillNews.save();

         return ChillNewsMapper.singleChillNewsMapper( newChillNews );

       } catch (error) {
        if(error instanceof CustomErr){
            throw error;
        }

        throw CustomErr.internalServerError();
       }
    }
    
}