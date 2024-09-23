import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementEntity } from './announcement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AnnouncementEntity])], // Register the repository
    providers: [AnnouncementService],
    controllers: [AnnouncementController],
    exports: [TypeOrmModule], // Export the TypeOrmModule for use in other modules
})
export class AnnouncementModule { }