import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from './food.controller';
import { FoodService } from 'src/food/services/food/food.service';

const mockFoodService = {};

describe('FoodController', () => {
  let controller: FoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [FoodService]
    })
    .overrideProvider(FoodService)
    .useValue(mockFoodService)
    .compile();

    controller = module.get<FoodController>(FoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
