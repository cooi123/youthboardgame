import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @Get()
    getAllUser() {
        return this.userService.getAllUsers()
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user points' })
    @ApiResponse({ status: 200, description: 'User points updated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                points: {
                    type: 'number',
                    example: 10,
                },
            },
        },
    })
    updateUserPoints(@Param('id') id: number, @Body('points') points: number) {
        return this.userService.updateUserPoints(id, points)
    }

    @Get(':id')

    getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id)
    }

}
