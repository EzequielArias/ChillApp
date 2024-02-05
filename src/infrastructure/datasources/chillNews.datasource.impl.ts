import { ChillNewsDatasource, ChillNewsDto, ChillNewsEntity, CustomErr, IChillNewsUpdateData } from "../../domain";
import { chillNewsModel } from "../../databases/mongodb";
import { ChillNewsMapper } from "../mappers";
import * as mongoose from 'mongoose';

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

            const validation = mongoose.isValidObjectId(id);

            if(!validation) throw CustomErr.badRequest('El id no es valido');

            const chillNews = await chillNewsModel.findById({ _id : id}).exec();
          
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

            const validation = mongoose.isValidObjectId(payload.id);

            if(!validation) throw CustomErr.badRequest('El id no es valido');

            const updatedChillNews = await chillNewsModel.findOneAndUpdate({ _id : payload.id }, payload.ChillNewsDto );

            if(!updatedChillNews) throw CustomErr.badRequest('No se encontre la chillNews');

            updatedChillNews.save();

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

            const validation = mongoose.isValidObjectId(id);

            if(!validation) throw CustomErr.badRequest('El id no es valido');

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
        const { userId, avatar, content } = ChillNewsDto;

       try {
         const newChillNews = await chillNewsModel.create({
             userId : userId,
             avatar : avatar,
             content : content
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