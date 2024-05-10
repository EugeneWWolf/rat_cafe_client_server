import { BadRequestException, Body, ConflictException, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductService } from 'src/modules/product/services/product/product.service';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Controller('product')
export class ProductController {
    constructor(private readonly foodService: ProductService) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        try {
            return await this.foodService.create(createProductDto);
        } catch (err) {
            if (err instanceof QueryFailedError && err.message.includes('duplicate key value violates unique constraint')) {
                throw new ConflictException(`Dublicate entry: product name must be unique`);
            } else {
                throw new InternalServerErrorException(`Failed to create entity`);
            }
        }
    }

    @Get()
    async findAll(): Promise<Product[]> {
        try {
            return await this.foodService.findAll();
        } catch(err) {
            throw new InternalServerErrorException(`Failed to fetch entities`);
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        try {
            return await this.foodService.findOne(id);
        } catch(err) {
            if (err instanceof EntityNotFoundError) {
                throw new NotFoundException(`Unable to find entity with ID ${id}`);
            }
            throw new InternalServerErrorException('Failed to fetch entity');
        }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<void> {
        try {
            await this.foodService.update(id, updateProductDto);
        } catch(err) {
            if (err instanceof EntityNotFoundError) {
                throw new NotFoundException(`Unable to find entity with ID ${id}`);
            } else if (err instanceof QueryFailedError && err.message.includes('duplicate key value violates unique constraint')) {
                throw new ConflictException(`Dublicate entry (product name must be unique)`);
            } else {
                throw new InternalServerErrorException(`Failed to update entity`);
            }
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        try {
            return await this.foodService.remove(id);
        } catch(err) {
            if (err instanceof EntityNotFoundError) {
                throw new NotFoundException(`Unable to find entity with ID ${id}`);
            } else {
                throw new InternalServerErrorException(`Failed to delete entity`);
            }
        }
    }
}
