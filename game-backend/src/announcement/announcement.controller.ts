import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './dtos/announcement.dto';

@ApiTags('Announcement')
@Controller('announcement')
export class AnnouncementController {
    constructor(private announcementService: AnnouncementService) { }

    @Get()
    getLatestAnnouncement() {
        return this.announcementService.getLatestAnnouncement();
    }

    @Post()
    createAnnouncement(@Body() announcementDto: AnnouncementDto) {
        return this.announcementService.createAnnouncement(announcementDto)
    }
}
