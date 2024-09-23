import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MapService } from './map.service';
import { MapDto } from './dtos/map.dto';

@ApiTags('Maps')
@Controller('map')
export class MapController {
    constructor(private mapService: MapService) { }

    @Get()

    getAllMaps() {
        return this.mapService.getAllMaps()
    }

    @Post()
    @ApiOperation({ summary: 'Create new maps' }) // Updated summary to reflect multiple maps
    @ApiBody({ type: [MapDto] }) // Specify that the request body is an array of MapDto
    createAllMaps(@Body() map: MapDto[]) {
        return this.mapService.createAllMaps(map);
    }

    @Patch()
    @ApiOperation({ summary: 'Update a map by ID' })
    @ApiBody({ type: MapDto }) // Specify that the request body is a single MapDto
    updateMapById(@Body() map: MapDto) {
        console.log(map);
        return this.mapService.updateMapById(map);
    }
}
