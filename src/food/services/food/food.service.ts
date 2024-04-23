import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';
import { UpdateFoodDto } from 'src/food/dto/update-food.dto';
import { Food } from 'src/food/entities/food.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FoodService {
    constructor(
        @InjectRepository(Food)
        private readonly foodRepository: Repository<Food>,
    ) {}

    async create(createFoodDto: CreateFoodDto): Promise<Food> {
        const food = this.foodRepository.create(createFoodDto);

        return await this.foodRepository.save(food);
    }

    async findAll(): Promise<Food[]> {
        const food = await this.foodRepository.find();

        if (!food) {
            throw new Error("Couldn't find data: database is empty");
        }

        return food;
    }

    async findOne(id: number): Promise<Food> {
        return await this.foodRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateFoodDto: UpdateFoodDto): Promise<void> {
        const food = await this.foodRepository.findOneBy({ id });
    
        if (!food) {
            throw new Error(`Couldn't update data: no item with such id (${id})`);
        }

        try {
            await this.foodRepository.update(id, updateFoodDto);
        } catch (err) {
            throw new Error(`Unable to update data with id (${id})`);
        }
    }

    async remove(id: number): Promise<Food> {
        const food = await this.foodRepository.findOneBy({ id });
    
        if (!food) {
            throw new Error(`Couldn't remove data: no item with such id (${id})`);
        }

        return await this.foodRepository.remove(food);
    }
}
