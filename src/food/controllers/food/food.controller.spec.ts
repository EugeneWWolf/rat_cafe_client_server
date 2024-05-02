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

  beforeEach(_preparation);

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    beforeEach(_preparation);
  
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should return new record made from DTO', async () => {
      const dto = new CreateFoodDto();
  
      service.create.mockResolvedValueOnce(new Food());
  
      const getRecord = controller.create(dto);
    
      expect(getRecord).resolves.toBeInstanceOf(Food);
    });

    it('should result in 500 status code if data is not correct', async () => {
      service.create.mockRejectedValueOnce(new Error('Price is less than 100'));
      expect(controller.create(new CreateFoodDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    beforeEach(_preparation);
  
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should return all records from data storage', async () => {
  
      service.findAll.mockResolvedValueOnce(new Array<Food>(new Food, new Food));
  
      const getRecord = controller.findAll();
  
      expect(getRecord).resolves.toStrictEqual(new Array<Food>(new Food, new Food));
    });

    it('should throw exception if data storage is empty', async () => {
      service.findAll.mockRejectedValueOnce(new Error('Data is not found'));
  
      expect(controller.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    beforeEach(_preparation);
  
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should return a record when data is found by id in data storage', async () => {
      service.findOne.mockResolvedValueOnce(new Food);
    
      const id = 2;
    
      expect(controller.findOne(id)).resolves.toBeInstanceOf(Food);
    });

    it('should throw an exception when data is not found in data storage', async () => {
      service.findOne.mockRejectedValueOnce(new Error('Data not found'));

      const id = 2;
    
      expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    beforeEach(_preparation);
  
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should call update from repository once', async () => {
      service.update.mockResolvedValueOnce();

      await controller.update(1, new UpdateFoodDto());
  
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should result in exception if data is not found', async () => {
      service.update.mockRejectedValueOnce(new Error('Data not found'));
  
      const id = 2;

      expect(controller.update(id, new UpdateFoodDto())).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    beforeEach(_preparation);
  
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('remove should return a deleted entry', async () => {
      service.remove.mockResolvedValueOnce(new Food);
  
      expect(controller.remove(1)).resolves.toBeInstanceOf(Food);
    });

    it('should result in exception if data not found', async () => {
      service.remove.mockRejectedValueOnce(new Error('Data not found'));
  
      const id = 2;

      expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
