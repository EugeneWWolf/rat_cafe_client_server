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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [FoodService]
    })
    .overrideProvider(FoodService)
    .useValue(createMock<FoodService>())
    .compile();

    controller = module.get<FoodController>(FoodController);
    service = module.get(FoodService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should return new record made from DTO', async () => {
    const dto = new CreateFoodDto();
  
    const foodPromise: Promise<Food> = new Promise((resolve) => {
      resolve(new Food());
    });

    service.create.mockResolvedValueOnce(foodPromise);

    const getRecord = controller.create(dto);
  
    await expect(getRecord).resolves.toBeInstanceOf(Food);
  });

  it('findAll should return all records from FoodService', async () => {
    const foodPromise: Promise<Food[]> = new Promise((resolve) => {
      resolve(new Array<Food>(new Food));
    });

    service.findAll.mockResolvedValueOnce(foodPromise);

    const getRecord = controller.findAll();

    await expect(getRecord).resolves.toStrictEqual(new Array<Food>(new Food));
  });

  it('findAll should throw exception if "database" is empty', async () => {
    service.findAll.mockImplementation(() => {
      throw new Error('Data not found');
    });

    await expect(controller.findAll()).rejects.toThrow(InternalServerErrorException);
  });

  it('findOne should return a record when data is found', async () => {
    const foodPromise: Promise<Food> = new Promise((resolve) => {
      resolve(new Food);
    });

    service.findOne.mockResolvedValueOnce(foodPromise);
  
    await expect(controller.findOne(2)).resolves.toBeInstanceOf(Food);
  });

  it('findOne should throw an exception when data is not found', async () => {
    service.findOne.mockImplementation((id) => {
      throw new Error('Data not found');
    });
  
    await expect(controller.findOne(2)).rejects.toThrow(NotFoundException);
  });

  it('update should update existing data with DTO', async () => {
    const data = new CreateFoodDto();
    data.price = 250;

    const updatedData = new UpdateFoodDto();
    updatedData.price = 235;

    service.update.mockImplementation(async () => {
      data.price = updatedData.price;
    });

    expect(data.price).toBe(250);

    await controller.update(1, updatedData);

    expect(data.price).toBe(235);
  });

  it('update should result in exception if data not found', async () => {
    service.update.mockImplementation(async () => {
      throw Error('Data not found');
    });

    await expect(controller.update(1, new UpdateFoodDto())).rejects.toThrow(NotFoundException);
  });

  it('remove should return a deleted entry', async () => {
    const foodPromise: Promise<Food> = new Promise((resolve) => {
      resolve(new Food);
    });

    service.remove.mockResolvedValueOnce(foodPromise);

    await expect(controller.remove(1)).resolves.toBeInstanceOf(Food);
  });

  it('remove should result in exception if data not found', async () => {
    service.remove.mockImplementation(async () => {
      throw Error('Data not found');
    });

    await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
  });
});
