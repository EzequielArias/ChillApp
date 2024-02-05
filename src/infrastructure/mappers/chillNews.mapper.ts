import { ChillNewsEntity } from "../../domain";
import { Document, Types } from "mongoose";

interface IChillNewsM extends Document  {
    userId: Types.ObjectId;
    avatar: string;
    content: string;
    _id: Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    __v?: number;
}

export class ChillNewsMapper {

    static singleChillNewsMapper ( data : IChillNewsM ) : ChillNewsEntity {
        return {
            id : data._id.toString(),
            userId : data.userId.toString(),
            avatar : data.avatar,
            chillNewContent : data.content,
        }
    }

    static multipleChillNewsMapper ( data : IChillNewsM[] ) : ChillNewsEntity[] {
        return data.map(( news ) => {
            return {
                id : news._id.toString(),
                userId : news.userId.toString(),
                avatar : news.avatar,
                chillNewContent : news.content,
            }
        })
    }
}