import { ChillNewsDto } from "../dtos";
import { ChillNewsEntity } from "../entities";

export abstract class ChillNewsRepository {
    abstract add( ChillNewsDto : ChillNewsDto ) : Promise<ChillNewsEntity>;
}