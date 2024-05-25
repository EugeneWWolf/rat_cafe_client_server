import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductService } from 'src/modules/product/services/product/product.service';
import { sendNoContentStatusCode } from 'src/utility/controller_helpers/sendNoContentStatusCode';
import { DatabaseExceptionFilter } from 'src/utility/exception_filters/DatabaseException.filter';

@Controller('product')
@UseFilters(DatabaseExceptionFilter)
export class ProductController {
    constructor(private readonly foodService: ProductService) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return await this.foodService.create(createProductDto);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.foodService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return await this.foodService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Res() res: Response): Promise<void> {
        await this.foodService.update(id, updateProductDto);
    
        sendNoContentStatusCode(res, 'update');
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return await this.foodService.remove(id);
    }
}
