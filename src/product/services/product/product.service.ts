import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly foodRepository: Repository<Product>,
    ) {}

    async create(createFoodDto: CreateProductDto): Promise<Product> {  
        try {
            const food = this.foodRepository.create(createFoodDto);

            return await this.foodRepository.save(food);
        } catch(err) {
            throw err;
        }
    }

    async findAll(): Promise<Product[]> {
        const food = await this.foodRepository.find()
            .catch((error) => {throw error});

        if (!food) {
            throw new Error("Couldn't find data: database is empty");
        }

        return await food;
    }

    async findOne(id: number): Promise<Product> {
        return await this.foodRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateFoodDto: UpdateProductDto): Promise<void> {
        const food = await this.foodRepository.findOneBy({ id })
            .catch((error) => {throw error});
    
        if (!food) {
            throw new Error(`Couldn't update data: no item with such id (${id})`);
        }

        try {
            await this.foodRepository.update(id, updateFoodDto);
        } catch(err) {
            throw err;
        }
    }

    async remove(id: number): Promise<Product> {
        const food = await this.foodRepository.findOneBy({ id })
            ;
    
        if (!food) {
            throw new Error(`Couldn't remove data: no item with such id (${id})`);
        }

        return await this.foodRepository.remove(food);
    }
}
