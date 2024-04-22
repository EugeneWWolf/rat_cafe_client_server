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
        return await this.foodRepository.find();
    }

    async findOne(id: number): Promise<Food | null> {
        return await this.foodRepository.findOneBy({ id });
    }

    async update(id: number, updateFoodDto: UpdateFoodDto): Promise<UpdateResult> {
        const food = await this.foodRepository.findOneBy({ id });
        if (!food) {
            throw new NotFoundException();
        }

        return this.foodRepository.update(id, updateFoodDto);
    }

    async remove(id: number): Promise<Food> {
        const food = await this.foodRepository.findOneBy({ id });
        if (!food) {
            throw new NotFoundException();
        }

        return await this.foodRepository.remove(food);
    }
}
