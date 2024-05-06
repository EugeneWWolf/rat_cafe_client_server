import { Module } from '@nestjs/common';
import { RatController } from './controllers/rat/rat.controller';

@Module({
  controllers: [RatController]
})
export class RatModule {}
