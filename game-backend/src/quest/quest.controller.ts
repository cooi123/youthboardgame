import { Controller, Get, Post, Body, Param, Patch, HttpException, Delete } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestDto } from './dtos/quest.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Quests')
@Controller('quest')
export class QuestController {
    constructor(private questService: QuestService) { }

    @Get("all")
    getAllQuests() {
        return this.questService.getAllQuests();
    }

    @Get("/team/:id")
    getTeamQuests(@Param('id') id: number) {
        console.log(id)
        return this.questService.findQuestByTeamId(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create new quest' })
    @ApiBody({ type: QuestDto })
    createQuest(@Body() quest: QuestDto) {
        return this.questService.addNewQuest(quest);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Complete quest' })
    @ApiResponse({ status: 200, description: 'Quest completed successfully' })
    @ApiResponse({ status: 404, description: 'Quest not found' })
    @ApiResponse({ status: 400, description: 'Quest already completed' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                complete: {
                    type: 'boolean',
                    example: true,
                },
            },
        },
    })
    completeQuest(@Param('id') id: number, @Body('complete') complete: boolean) {

        return this.questService.completeQuest(id, complete);


    }

    @ApiOperation({ summary: 'Delete quest' })
    @Delete(':id')
    deleteQuestById(@Param('id') id: number) {
        return this.questService.deleteQuestById(id);
    }
}
