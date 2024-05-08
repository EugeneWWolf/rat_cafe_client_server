import { Module } from '@nestjs/common';
import { RatController } from './controllers/rat/rat.controller';
import { Rat } from './entities/rat.entity';
import { RatService } from './services/rat/rat.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rat])],
  controllers: [RatController],
  providers: [RatService]
})
export class RatModule {}
