import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly foodRepository: Repository<Product>,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {  
        try {
            const food = this.foodRepository.create(createProductDto);

            return await this.foodRepository.save(food);
        } catch(err) {
            if (err instanceof QueryFailedError) {
                throw new Error('Price must be larger than or equal to 100 rubles');
            } else {
                throw err;
            }
        }
    }

    async findAll(): Promise<Product[]> {
        const food = await this.foodRepository.find();

        if (!food) {
            throw new NotFoundError("Couldn't find data: database is empty");
        }

        return await food;
    }

    async findOne(id: number): Promise<Product> {
        return await this.foodRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
        const food = await this.foodRepository.findOneBy({ id });
    
        if (!food) {
            throw new NotFoundError(`Couldn't update data: no item with such id (${id})`);
        }

        try {
            await this.foodRepository.update(id, updateProductDto);
        } catch(err) {
            if (err instanceof QueryFailedError) {
                throw new Error('Price must be larger than or equal to 100 rubles');
            } else {
                throw err;
            }
        }
    }

    async remove(id: number): Promise<Product> {
        const food = await this.foodRepository.findOneBy({ id });
    
        if (!food) {
            throw new NotFoundError(`Couldn't remove data: no item with such id (${id})`);
        }

        try {
            return await this.foodRepository.remove(food);
        } catch(err) {
            throw new Error('Unable to remove entity (item with this id exists, but something went wrong)');
        }
    }
}
