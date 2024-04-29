import { Test } from '@nestjs/testing';
import { FoodService } from './food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';
import { Food } from 'src/food/entities/food.entity';
import { Repository } from 'typeorm';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';
import { UpdateFoodDto } from 'src/food/dto/update-food.dto';
import { fakeFoodHelper } from './helpers';

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

    it('should call create from repository once', async () => {
      const food = fakeFoodHelper();

      repositoryMock.create.mockReturnValueOnce(new Food());
      
      await service.create(food);

      expect(repositoryMock.create).toHaveBeenCalledWith(food);
      expect(repositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it('should return Food object', async () => {
      const food = fakeFoodHelper();

      repositoryMock.save.mockResolvedValueOnce(new Food());

      expect(service.create(food)).resolves.toBeInstanceOf(Food);
    });
  });

  describe('findAll', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should result in error if data storage is empty', async () => {
      repositoryMock.find.mockResolvedValueOnce(null as Array<Food>);
      
      expect(service.findAll()).rejects.toThrow("Couldn't find data: database is empty");
    });

    it('should return data when data storage is not empty', async () => {
      const data = new Array<Food>(new Food, new Food);

      repositoryMock.find.mockResolvedValueOnce(data);

      expect(service.findAll()).resolves.toStrictEqual(data);
    });
  });

  describe('findOne', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should reject promise if data not found', async () => {
      repositoryMock.findOneByOrFail.mockRejectedValueOnce(new Error('Data not found'));

      expect(service.findOne(2)).rejects.toThrow('Data not found');
    });

    it('should return data if found', async () => {
      repositoryMock.findOneByOrFail.mockResolvedValueOnce(new Food);

      expect(service.findOne(2)).resolves.toBeInstanceOf(Food);
    });
  });

  describe('update', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should result in error if data not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(null as Food);

      const id = 2;

      expect(service.update(id, new UpdateFoodDto())).rejects.toThrow(`Couldn't update data: no item with such id (${id})`);
    });

    it('should call update from repository once if data is found', async () => {
      await service.update(2, new UpdateFoodDto());

      expect(repositoryMock.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should result in error if data not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(null as Food);

      const id = 2;

      expect(service.remove(id)).rejects.toThrow(`Couldn't remove data: no item with such id (${id})`);
    });

    it('should return deleted item if found', async () => {
      repositoryMock.remove.mockResolvedValueOnce(new Food());

      expect(service.remove(2)).resolves.toBeInstanceOf(Food);
    });
  });
});