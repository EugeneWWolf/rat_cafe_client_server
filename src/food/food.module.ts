import { Module } from '@nestjs/common';
import { FoodController } from './controllers/food/food.controller';
import { FoodService } from './services/food/food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule {}
