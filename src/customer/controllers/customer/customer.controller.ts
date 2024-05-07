import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerService } from 'src/customer/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    async create(@Body() createProductDto: CreateCustomerDto): Promise<Customer> {
        try {
            return await this.customerService.create(createProductDto);
        } catch (err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get()
    async findAll(): Promise<Customer[]> {
        try {
            return await this.customerService.findAll();
        } catch(err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
        try {
            return await this.customerService.findOne(id);
        } catch(err) {
            throw new NotFoundException({message: err.message});
        }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto): Promise<void> {
        try {
            await this.customerService.update(id, updateCustomerDto);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException({message: err.message});
            } else {
                throw new InternalServerErrorException({message: err.message});
            }
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
        try {
            return await this.customerService.remove(id);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException({message: err.message});
            } else {
                throw new InternalServerErrorException({message: err.message});
            }
        }
    }
}

