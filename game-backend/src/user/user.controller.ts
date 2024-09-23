import { Controller, Get, Patch, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @Get("all")
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

    @Put("/all")
    @ApiOperation({ summary: 'Update all users' })
    @ApiResponse({ status: 200, description: 'All users updated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiBody({
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 1,
                    },
                    name: {
                        type: 'string',
                        example: 'John Doe',
                    },
                    points: {
                        type: 'number',
                        example: 10,
                    },
                    color: {
                        type: 'string',
                        example: 'red',
                    },
                    soldier: {
                        type: 'number',
                        example: 1,
                    },
                    shield: {
                        type: 'number',
                        example: 1,
                    },
                },
            },
        },
    })
    updateAllUsers(@Body() users) {
        return this.userService.updateAllUsers(users)
    }


}
