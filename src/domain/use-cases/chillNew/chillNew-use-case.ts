import { ChillNewsDto } from "../../dtos"
import { ChillNewsEntity } from "../../entities"
import { ChillNewsRepository } from "../../repositories";
import { ISessionPayload, IChillNewsUpdateData } from "../../interfaces";

interface ChillNewUseCase {
    add(ChillNewsDto: ChillNewsDto): Promise<ChillNewsEntity>;
    getRecommended( ISessionPayload : ISessionPayload ): Promise<ChillNewsEntity[]>;
    getOne( id : string ): Promise<ChillNewsEntity>;
    update( payload : IChillNewsUpdateData): Promise<ChillNewsEntity>;
    remove( id : string ): Promise<void>;
}

export class ChillNew implements ChillNewUseCase {

    constructor(
        private ChillNewRepository: ChillNewsRepository
    ) { }

    getRecommended( ISessionPayload : ISessionPayload ): Promise<ChillNewsEntity[]> {
        console.log(ISessionPayload);
        return this.ChillNewRepository.getRecommended( ISessionPayload );
    }

    getOne( id : string ): Promise<ChillNewsEntity> {
        return this.ChillNewRepository.getOne( id );
    }

    update( payload : IChillNewsUpdateData ): Promise<ChillNewsEntity> {
        return this.ChillNewRepository.update(payload);
    }

    remove ( id : string ): Promise<void> {
        return this.ChillNewRepository.remove( id );
    }

    add(ChillNewsDto: ChillNewsDto): Promise<ChillNewsEntity> {
        return this.ChillNewRepository.add(ChillNewsDto);
    }


}