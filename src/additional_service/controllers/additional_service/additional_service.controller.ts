import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateAdditionalServiceDto } from 'src/additional_service/dto/create-additional-service.dto';
import { UpdateAdditionalServiceDto } from 'src/additional_service/dto/update-additional-service.dto';
import { AdditionalService } from 'src/additional_service/entities/additional_service.entity';
import { AdditionalServiceService } from 'src/additional_service/services/additional_service/additional_service.service';

@Controller('additional-service')
export class AdditionalServiceController {
    constructor(private readonly additionalServiceService: AdditionalServiceService) {}

    @Post()
    async create(@Body() createAdditionalServiceDto: CreateAdditionalServiceDto): Promise<AdditionalService> {
        try {
            return await this.additionalServiceService.create(createAdditionalServiceDto);
        } catch (err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get()
    async findAll(): Promise<AdditionalService[]> {
        try {
            return await this.additionalServiceService.findAll();
        } catch(err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<AdditionalService> {
        try {
            return await this.additionalServiceService.findOne(id);
        } catch(err) {
            throw new NotFoundException({message: err.message});
        }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateAdditionalServiceDto): Promise<void> {
        try {
            await this.additionalServiceService.update(id, updateProductDto);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException({message: err.message});
            } else {
                throw new InternalServerErrorException({message: err.message});
            }
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<AdditionalService> {
        try {
            return await this.additionalServiceService.remove(id);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException({message: err.message});
            } else {
                throw new InternalServerErrorException({message: err.message});
            }
        }
    }
}
