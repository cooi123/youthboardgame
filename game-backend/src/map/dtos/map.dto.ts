import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
export class MapDto {
    @ApiProperty({ description: 'The unique identifier for the map' })
    gridNumber: number;

    @IsOptional() // In case the team can be null
    @IsInt()
    @ApiProperty({ description: 'The shield status of the map' })
    shield: boolean;

    @ApiProperty({ description: 'The team assigned to the map' })
    team?: number;
}