import { Injectable } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementDto } from './dtos/announcement.dto';
@Injectable()
export class AnnouncementService {
    constructor(
        @InjectRepository(AnnouncementEntity)
        private readonly announcementRepository: Repository<AnnouncementEntity>,
    ) { }
    async getLatestAnnouncement() {
        return this.announcementRepository.findOne({ where: {}, order: { created_at: 'DESC' } });
    }

    async createAnnouncement(announcementDto: AnnouncementDto) {
        const announcement = this.announcementRepository.create(announcementDto);
        return this.announcementRepository.save(announcement);
    }

}
