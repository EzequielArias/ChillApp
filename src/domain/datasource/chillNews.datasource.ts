import { ChillNewsDto } from "../dtos";
import { ChillNewsEntity } from "../entities";

export abstract class ChillNewsDatasource {
    abstract add ( ChillNewsDto : ChillNewsDto ) : Promise<ChillNewsEntity>;
}