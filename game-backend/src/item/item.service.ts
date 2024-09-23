import { Injectable } from '@nestjs/common';
import { ItemEntity } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDto } from './dtos/item.dto';

@Injectable()
export class ItemService {
    constructor(@InjectRepository(ItemEntity) private itemRepository: Repository<ItemEntity>) { }

    async findAllItems(): Promise<ItemEntity[]> {
        return this.itemRepository.find();
    }

    async update(id: number, item: ItemDto): Promise<ItemEntity> {
        await this.itemRepository.update(id, item);
        return this.itemRepository.findOne({ where: { id: id } });
    }

    async updateAll(items: ItemDto[]): Promise<ItemEntity[]> {
        for (let i = 0; i < items.length; i++) {
            await this.itemRepository.update(items[i].id, items[i]);
        }
        return this.itemRepository.find();
    }

    async create(item: ItemDto): Promise<ItemEntity> {

        return this.itemRepository.save(item);
    }


}

