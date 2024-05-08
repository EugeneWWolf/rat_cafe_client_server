import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { Repository } from 'typeorm';
import { fakeProductHelper } from './helpers';
import { ProductService } from './product.service';

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
      const food = fakeProductHelper();

      repositoryMock.create.mockReturnValueOnce(new Product());
      
      await service.create(food);

      expect(repositoryMock.create).toHaveBeenCalledWith(food);
      expect(repositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it('should return Food object', async () => {
      const food = fakeProductHelper();

      repositoryMock.save.mockResolvedValueOnce(new Product());

      expect(service.create(food)).resolves.toBeInstanceOf(Product);
    });
  });

  describe('findAll', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should result in error if data storage is empty', async () => {
      repositoryMock.find.mockResolvedValueOnce(null as Array<Product>);
      
      expect(service.findAll()).rejects.toThrow("Couldn't find data: database is empty");
    });

    it('should return data when data storage is not empty', async () => {
      const data = new Array<Product>(new Product, new Product);

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
      repositoryMock.findOneByOrFail.mockResolvedValueOnce(new Product);

      expect(service.findOne(2)).resolves.toBeInstanceOf(Product);
    });
  });

  describe('update', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should result in error if data not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(null as Product);

      const id = 2;

      expect(service.update(id, new UpdateProductDto())).rejects.toThrow(`Couldn't update data: no item with such id (${id})`);
    });

    it('should call update from repository once if data is found', async () => {
      await service.update(2, new UpdateProductDto());

      expect(repositoryMock.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    beforeEach(_preparation);

    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should result in error if data not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(null as Product);

      const id = 2;

      expect(service.remove(id)).rejects.toThrow(`Couldn't remove data: no item with such id (${id})`);
    });

    it('should return deleted item if found', async () => {
      repositoryMock.remove.mockResolvedValueOnce(new Product());

      expect(service.remove(2)).resolves.toBeInstanceOf(Product);
    });
  });
});