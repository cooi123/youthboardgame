import { Injectable, } from '@nestjs/common';
import { MapEntity } from './map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapDto } from './dtos/map.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class MapService {

    constructor(@InjectRepository(MapEntity) private mapRepository: Repository<MapEntity>,
        @InjectRepository(UserEntity)
        private readonly teamRepository: Repository<UserEntity>
    ) {
    }

    async getAllMaps(): Promise<MapEntity[]> {

        return this.mapRepository
            .createQueryBuilder('map')
            .leftJoin('map.team', 'user')
            .addSelect(['user.id', 'user.name', 'user.color'])
            .orderBy('map.gridNumber')
            .getMany()

    }

    async createAllMaps(mapDtos: MapDto[]): Promise<MapEntity[]> {
        const maps = [];

        for (const dto of mapDtos) {
            const mapEntity = this.mapRepository.create({
                gridNumber: dto.gridNumber,
                shield: dto.shield,
                team: null,
            });

            maps.push(mapEntity);
        }

        return this.mapRepository.save(maps);
    }

    async updateMapById(mapDto: MapDto): Promise<MapEntity> {

        const gridNumber = mapDto.gridNumber;
        const map = await this.mapRepository.findOne({ where: { gridNumber } });
        if (mapDto.team === null) {
            map.team = null;
            return this.mapRepository.save(map);
        }
        const team = await this.teamRepository.findOne({ where: { id: mapDto.team } });

        if (!map) {
            throw new Error('Map not found');
        }
        if (!team) {
            throw new Error('Team not found');
        }

        map.shield = mapDto.shield;
        map.team = team

        return this.mapRepository.save(map);
    }

}
