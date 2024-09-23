import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { UserModule } from 'src/user/user.module';
import { MapEntity } from './map.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

@Module({
  providers: [MapService],
  controllers: [MapController],
  imports: [TypeOrmModule.forFeature([MapEntity]), TypeOrmModule.forFeature([UserEntity])],

})
export class MapModule { }
