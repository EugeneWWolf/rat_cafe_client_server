import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductService } from 'src/modules/product/services/product/product.service';
import { ProductController } from './product.controller';
import { Response } from 'express';

describe('ProductController', () => {
  let controller: ProductController;
  let service: DeepMocked<ProductService>;

  const _preparation = async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService]
    })
    .overrideProvider(ProductService)
    .useValue(createMock<ProductService>())
    .compile();

    controller = module.get<ProductController>(ProductController);
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

    it('should reject if data is not valid', async () => {
      const dto = new CreateProductDto();

      service.create.mockRejectedValueOnce(new Error('Price is less than 100'));

      const getRecord = controller.create(dto);

      expect(getRecord).rejects.toThrow('Price is less than 100');
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
  
      expect(controller.findAll()).rejects.toThrow('Data is not found');
    });
  });

  describe('findOne', () => {
    beforeEach(_preparation);
  
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should return a record when data is found', async () => {
      service.findOne.mockResolvedValueOnce(new Product);
    
      const id = 2;
    
      expect(controller.findOne(id)).resolves.toBeInstanceOf(Product);
    });

    it('should throw an exception when data is not found in data storage', async () => {
      service.findOne.mockRejectedValueOnce(new Error('Data not found'));

      const id = 2;
    
      expect(controller.findOne(id)).rejects.toThrow('Data not found');
    });
  });

  describe('update', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should return 201 status code when update successful', async () => {
      const statusResponseMock = {
        send: jest.fn((x) => x),
      }
      
      const responseMock = {
        status: jest.fn((x) => statusResponseMock),
        send: jest.fn((x) => x),
      } as unknown as Response
    
      service.update.mockResolvedValueOnce();

      await controller.update(1, new UpdateProductDto(), responseMock);
  
      await expect(responseMock.status).toHaveBeenCalledWith(204);
    });

    it('should return 500 status code when unable to send request', async () => {
      const statusResponseMock = {
        send: jest.fn((x) => x),
      }
      
      const responseMock = {
        status: jest.fn((x) => statusResponseMock),
        send: jest.fn(() => {throw new Error()}),
      } as unknown as Response
    
      
      service.update.mockResolvedValueOnce();

      try {
        await controller.update(1, new UpdateProductDto(), responseMock);
      } catch (err) {
        expect(responseMock.status).toHaveBeenCalledTimes(2);
        expect(responseMock.status).toHaveBeenLastCalledWith(500);
      }
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

      expect(controller.remove(id)).rejects.toThrow('Data not found');
    });
  });
});
