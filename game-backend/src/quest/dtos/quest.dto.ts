import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestDto {
    @ApiProperty({ description: 'The unique identifier for the quest' })
    id: number;

    @ApiProperty({ description: 'The name of the quest' })
    name: string;

    @ApiProperty({ description: 'The description of the quest' })
    description: string;

    @ApiProperty({ description: 'The points of the quest' })
    points: number;

    @ApiProperty({ description: 'The status of the quest' })
    @IsBoolean()
    done: boolean;

    @ApiProperty({ description: 'The team_id of the quest' })
    team_id: number;
}
