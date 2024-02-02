import { ChillNewsDto } from "../../dtos"
import { ChillNewsEntity } from "../../entities"
import { ChillNewsRepository } from "../../repositories";

interface ChillNewUseCase {
    add( ChillNewsDto : ChillNewsDto ) : Promise<ChillNewsEntity>;
}

export class ChillNew implements ChillNewUseCase {

    constructor(
        private ChillNewRepository : ChillNewsRepository
    ){}

    add(ChillNewsDto: ChillNewsDto): Promise<ChillNewsEntity> {
        return this.ChillNewRepository.add( ChillNewsDto );
    }
}