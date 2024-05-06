import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from './product.controller';
import { ProductService } from 'src/product/services/product/product.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { Product } from 'src/product/entities/product.entity';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

describe('ProductController', () => {
  let controller: FoodController;
  let service: DeepMocked<ProductService>;

  const _preparation = async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [ProductService]
    })
    .overrideProvider(ProductService)
    .useValue(createMock<ProductService>())
    .compile();

    controller = module.get<FoodController>(FoodController);
    service = module.get(ProductService);
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
      const dto = new CreateProductDto();
  
      service.create.mockResolvedValueOnce(new Product());
  
      const getRecord = controller.create(dto);
    
      expect(getRecord).resolves.toBeInstanceOf(Product);
    });

    it('should result in 500 status code if data is not correct', async () => {
      service.create.mockRejectedValueOnce(new Error('Price is less than 100'));
      expect(controller.create(new CreateProductDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    beforeEach(_preparation);
  
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should return all records from data storage', async () => {
  
      service.findAll.mockResolvedValueOnce(new Array<Product>(new Product, new Product));
  
      const getRecord = controller.findAll();
  
      expect(getRecord).resolves.toStrictEqual(new Array<Product>(new Product, new Product));
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
      service.findOne.mockResolvedValueOnce(new Product);
    
      const id = 2;
    
      expect(controller.findOne(id)).resolves.toBeInstanceOf(Product);
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

      await controller.update(1, new UpdateProductDto());
  
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should result in exception if data is not found', async () => {
      service.update.mockRejectedValueOnce(new Error('Data not found'));
  
      const id = 2;

      expect(controller.update(id, new UpdateProductDto())).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    beforeEach(_preparation);
  
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('remove should return a deleted entry', async () => {
      service.remove.mockResolvedValueOnce(new Product);
  
      expect(controller.remove(1)).resolves.toBeInstanceOf(Product);
    });

    it('should result in exception if data not found', async () => {
      service.remove.mockRejectedValueOnce(new Error('Data not found'));
  
      const id = 2;

      expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
