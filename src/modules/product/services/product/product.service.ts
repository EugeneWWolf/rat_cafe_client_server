import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(
        @InjectRepository(Product)
        private readonly foodRepository: Repository<Product>,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {  
        try {
            const food = this.foodRepository.create(createProductDto);

            return await this.foodRepository.save(food);
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.foodRepository.find();
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async findOne(id: number): Promise<Product> {
        try {
            return await this.foodRepository.findOneByOrFail({ id });
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
        try {
            await this.foodRepository.findOneByOrFail({ id });
            await this.foodRepository.update(id, updateProductDto);
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async remove(id: number): Promise<Product> {
        try {
            const product = await this.foodRepository.findOneByOrFail({ id });
            return await this.foodRepository.remove(product);
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }
}
