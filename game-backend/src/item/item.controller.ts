import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { ItemDto } from './dtos/item.dto';

@ApiTags('Items')
@Controller('item')
export class ItemController {
    constructor(private ItemService: ItemService) { }

    @Get()
    getAllItems() {
        return this.ItemService.findAllItems()
    }

    @Put()
    updateAllItems(@Body() items: ItemDto[]) {
        return this.ItemService.updateAll(items)
    }


}
