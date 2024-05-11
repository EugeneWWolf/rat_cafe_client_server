import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../dto/create-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repositoryMock = createMock<Repository<Product>>();

  const _preparation = async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
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
      const food = new CreateProductDto();

      repositoryMock.create.mockReturnValueOnce(new Product());
      
      await service.create(food);

      expect(repositoryMock.create).toHaveBeenCalledWith(food);
      expect(repositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it('should result in Product if theres no errors', async () => {
      const food = new CreateProductDto();

      repositoryMock.save.mockResolvedValueOnce(new Product());

      await expect(service.create(food)).resolves.toBeInstanceOf(Product);
    });

    it('should result in error if repository fails', async () => {
      const food = new CreateProductDto();

      repositoryMock.save.mockRejectedValueOnce(new Error('Some error occured'));

      await expect(service.create(food)).rejects.toThrow('Some error occured');
    });
  });

  describe('findAll', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should result in empty array if data storage is empty', async () => {
      repositoryMock.find.mockResolvedValueOnce([]);
      
      await expect(service.findAll()).resolves.toEqual([]);
    });

    it('should return data when data storage is not empty', async () => {
      const data = new Array<Product>(new Product, new Product);

      repositoryMock.find.mockResolvedValueOnce(data);

      await expect(service.findAll()).resolves.toStrictEqual(data);
    });

    it('should resolve in error if repository fails', async () => {
      repositoryMock.find.mockRejectedValueOnce(new Error('Some error occured'));

      await expect(service.findAll()).rejects.toThrow('Some error occured');
    });
  });

  describe('findOne', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should reject promise if data not found', async () => {
      repositoryMock.findOneByOrFail.mockRejectedValueOnce(new Error('Data not found'));

      await expect(service.findOne(2)).rejects.toThrow('Data not found');
    });

    it('should return data if found', async () => {
      repositoryMock.findOneByOrFail.mockResolvedValueOnce(new Product);

      await expect(service.findOne(2)).resolves.toBeInstanceOf(Product);
    });
  });

  describe('update', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should result in error if data not found', async () => {
      repositoryMock.findOneByOrFail.mockRejectedValueOnce(new Error('Data not found'));

      const id = 2;

      await expect(service.update(id, new UpdateProductDto())).rejects.toThrow('Data not found');
    });

    it('should call update from repository once if data is found', async () => {
      repositoryMock.findOneByOrFail.mockResolvedValueOnce(new Product());

      await service.update(2, new UpdateProductDto());

      expect(repositoryMock.update).toHaveBeenCalledTimes(1);
    });

    it('should reject if there was an error during data update', async () => {
      repositoryMock.findOneByOrFail.mockResolvedValueOnce(new Product());
      repositoryMock.update.mockRejectedValueOnce(new Error('Some error occured'));

      await expect(service.update(2, new UpdateProductDto())).rejects.toThrow('Some error occured');
    });
  });

  describe('remove', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should result in error if data not found', async () => {
      repositoryMock.findOneByOrFail.mockRejectedValueOnce(new Error('Some error occured'));

      const id = 2;

      await expect(service.remove(id)).rejects.toThrow('Some error occured');
    });

    it('should return deleted item if found', async () => {
      repositoryMock.remove.mockResolvedValueOnce(new Product());

      const id = 2;

      await expect(service.remove(id)).resolves.toBeInstanceOf(Product);
    });

    it('should reject if error while deleting', async () => {
      repositoryMock.remove.mockRejectedValueOnce(new Error('Some error occured'));

      const id = 2;

      await expect(service.remove(id)).rejects.toThrow('Some error occured');
    });
  });
});