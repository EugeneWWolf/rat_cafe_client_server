import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/services/product/product.service';

@Controller('product')
export class FoodController {
    constructor(private readonly foodService: ProductService) {}

    @Post()
    async create(@Body() createFoodDto: CreateProductDto): Promise<Product> {
        try {
            return await this.foodService.create(createFoodDto);
        } catch (err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get()
    async findAll(): Promise<Product[]> {
        try {
            return await this.foodService.findAll();
        } catch(err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        try {
            return await this.foodService.findOne(id);
        } catch(err) {
            throw new NotFoundException({message: err.message});
        }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateFoodDto: UpdateProductDto): Promise<void> {
        try {
            await this.foodService.update(id, updateFoodDto);
        } catch(err) {
            throw new NotFoundException({message: err.message});
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        try {
            return await this.foodService.remove(id);
        } catch(err) {
            throw new NotFoundException({message: err.message});
        }
    }
}
