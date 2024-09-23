import { Module } from '@nestjs/common';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';
import { QuestEntity } from './quest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
@Module({
  controllers: [QuestController],
  providers: [QuestService],
  imports: [TypeOrmModule.forFeature([QuestEntity]), TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule]


})
export class QuestModule { }
