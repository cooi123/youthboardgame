
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {

    id: number;
    @ApiProperty({
        description: 'The name of the item',
        example: 'Sword',
    })

    name: string;
    @ApiProperty({
        description: 'The description of the item',
        example: 'A sword that can be used to fight enemies',
    })
    description: string;
    @ApiProperty({
        description: 'The price of the item',
        example: 100,
    })
    price: number;
}
