import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';
import { UpdateFoodDto } from 'src/food/dto/update-food.dto';
import { Food } from 'src/food/entities/food.entity';
import { FoodService } from 'src/food/services/food/food.service';

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) {}

    @Post()
    async create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
        try {
            return await this.foodService.create(createFoodDto);
        } catch (err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get()
    async findAll(): Promise<Food[]> {
        try {
            return await this.foodService.findAll();
        } catch(err) {
            throw new InternalServerErrorException("Database is empty");
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Food> {
        try {
            return await this.foodService.findOne(id);
        } catch(err) {
            throw new NotFoundException(`Cannot find item with id ${id}`);
        }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateFoodDto: UpdateFoodDto): Promise<void> {
        try {
            await this.foodService.update(id, updateFoodDto);
        } catch(err) {
            throw new NotFoundException(`Cannot update item with id ${id}`);
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Food> {
        try {
            return await this.foodService.remove(id);
        } catch(err) {
            throw new NotFoundException(`Cannot delete item with id ${id}`);
        }
    }
}
