import { Test, TestingModule } from '@nestjs/testing';
import { FoodService } from './food.service';

const mockFoodService = {};

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodService],
    })
    .overrideProvider(FoodService)
    .useValue(mockFoodService)
    .compile();

    service = module.get<FoodService>(FoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
