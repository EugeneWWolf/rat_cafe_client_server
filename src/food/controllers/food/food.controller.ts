import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';
import { UpdateFoodDto } from 'src/food/dto/update-food.dto';
import { Food } from 'src/food/entities/food.entity';
import { FoodService } from 'src/food/services/food/food.service';

/* 
    @TODO: Добавить проверку на поступающие данные (в виде пайпов?) на null, так как когда поступило null
    название блюда, сервак покрошился.
*/

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) {}

    @Post()
    async create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
        return await this.foodService.create(createFoodDto);
    }

    @Get()
    async findAll(): Promise<Food[]> {
        return await this.foodService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Food> {
        return await this.foodService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateFoodDto: UpdateFoodDto): Promise<void> {
        try {
            await this.foodService.update(id, updateFoodDto);
        } catch(NotFoundException) {
            throw new HttpException(`food with id "${id}" wasn't found`, HttpStatus.NOT_FOUND);
        }
    
        return;
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {

        try {
            await this.foodService.remove(id);
        } catch(NotFoundException) {
            throw new HttpException(`food with id "${id}" wasn't found`, HttpStatus.NOT_FOUND);
        }

        return;
    }
}
