import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductService } from 'src/modules/product/services/product/product.service';
import { NotFoundError } from 'src/utility/error_handling/database-errors';

@Controller('product')
export class ProductController {
    constructor(private readonly foodService: ProductService) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        try {
            return await this.foodService.create(createProductDto);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get()
    async findAll(): Promise<Product[]> {
        try {
            return await this.foodService.findAll();
        } catch(err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        try {
            return await this.foodService.findOne(id);
        } catch(err) {
            throw new NotFoundException(err.message);
        }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<void> {
        try {
            await this.foodService.update(id, updateProductDto);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException(err.message);
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        try {
            return await this.foodService.remove(id);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException(err.message);
            } else {
                throw new InternalServerErrorException(err.message);
            }
        }
    }
}
