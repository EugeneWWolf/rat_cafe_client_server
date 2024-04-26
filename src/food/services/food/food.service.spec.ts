import { Test } from '@nestjs/testing';
import { FoodService } from './food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';
import { Food } from 'src/food/entities/food.entity';
import { Repository } from 'typeorm';

describe('FoodService', () => {
  let service: FoodService;
  let repositoryMock = createMock<Repository<Food>>();

  const _preparation = async () => {
    const module = await Test.createTestingModule({
      providers: [
        FoodService,
        {
          provide: getRepositoryToken(Food),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
  };

  beforeEach(_preparation);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    beforeEach(_preparation);
    
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });
  });
});
