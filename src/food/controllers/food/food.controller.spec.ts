import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from './food.controller';
import { FoodService } from 'src/food/services/food/food.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';
import { Food } from 'src/food/entities/food.entity';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateFoodDto } from 'src/food/dto/update-food.dto';

const mockFoodService = {};

describe('FoodController', () => {
  let controller: FoodController;
  let service: DeepMocked<FoodService>;

  const _preparation = async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [FoodService]
    })
    .overrideProvider(FoodService)
    .useValue(createMock<FoodService>())
    .compile();

    controller = module.get<FoodController>(FoodController);
    service = module.get(FoodService);
  };

  const _cleanup = function() {
    jest.clearAllMocks();
  };

  beforeEach(_preparation);
  afterEach(_cleanup);

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    beforeEach(_preparation);
    afterEach(_cleanup);
  
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should return new record made from DTO', async () => {
      const dto = new CreateFoodDto();
    
      const foodPromise: Promise<Food> = new Promise((resolve) => {
        resolve(new Food());
      });
  
      service.create.mockResolvedValueOnce(foodPromise);
  
      const getRecord = controller.create(dto);
    
      await expect(getRecord).resolves.toBeInstanceOf(Food);
    });
  });

  describe('findAll', () => {
    beforeEach(_preparation);
    afterEach(_cleanup);
  
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should return all records from data storage', async () => {
      const foodPromise: Promise<Food[]> = new Promise((resolve) => {
        resolve(new Array<Food>(new Food, new Food));
      });
  
      service.findAll.mockResolvedValueOnce(foodPromise);
  
      const getRecord = controller.findAll();
  
      await expect(getRecord).resolves.toStrictEqual(new Array<Food>(new Food, new Food));
    });

    it('should throw exception if data storage is empty', async () => {
      service.findAll.mockImplementation(() => {
        throw new Error('Database is empty');
      });
  
      await expect(controller.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    beforeEach(_preparation);
    afterEach(_cleanup);
  
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should return a record when data is found by id in data storage', async () => {
      const foodPromise: Promise<Food> = new Promise((resolve) => {
        resolve(new Food);
      });
  
      service.findOne.mockResolvedValueOnce(foodPromise);
    
      await expect(controller.findOne(2)).resolves.toBeInstanceOf(Food);
    });

    it('should throw an exception when data is not found in data storage', async () => {
      service.findOne.mockImplementation(() => {
        throw new Error('Data not found');
      });
    
      await expect(controller.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    beforeEach(_preparation);
    afterEach(_cleanup);
  
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should call update from repository once', async () => {
      const updatedDataPromise: Promise<void> = new Promise((resolve) => {
        resolve();
      });

      service.update.mockResolvedValueOnce(updatedDataPromise);

      await controller.update(1, new UpdateFoodDto());
  
      await expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should result in exception if data is not found', async () => {
      service.update.mockImplementation(() => {
        throw Error('Data not found');
      });
  
      await expect(controller.update(1, new UpdateFoodDto())).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    beforeEach(_preparation);
    afterEach(_cleanup);
  
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('remove should return a deleted entry', async () => {
      const foodPromise: Promise<Food> = new Promise((resolve) => {
        resolve(new Food);
      });
  
      service.remove.mockResolvedValueOnce(foodPromise);
  
      await expect(controller.remove(1)).resolves.toBeInstanceOf(Food);
    });

    it('should result in exception if data not found', async () => {
      service.remove.mockImplementation(() => {
        throw Error('Data not found');
      });
  
      await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
