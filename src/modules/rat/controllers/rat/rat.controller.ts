import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateRatDto } from 'src/modules/rat/dto/create-rat.dto';
import { UpdateRatDto } from 'src/modules/rat/dto/update-rat.dto';
import { Rat } from 'src/modules/rat/entities/rat.entity';
import { RatService } from 'src/modules/rat/services/rat/rat.service';

@Controller('rat')
export class RatController {
    constructor(private readonly ratService: RatService) {}

    @Post()
    async create(@Body() createRatDto: CreateRatDto): Promise<Rat> {
        try {
            return await this.ratService.create(createRatDto);
        } catch (err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get()
    async findAll(): Promise<Rat[]> {
        try {
            return await this.ratService.findAll();
        } catch(err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Rat> {
        try {
            return await this.ratService.findOne(id);
        } catch(err) {
            throw new NotFoundException({message: err.message});
        }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateRatDto: UpdateRatDto): Promise<void> {
        try {
            await this.ratService.update(id, updateRatDto);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException({message: err.message});
            } else {
                throw new InternalServerErrorException({message: err.message});
            }
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Rat> {
        try {
            return await this.ratService.remove(id);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException({message: err.message});
            } else {
                throw new InternalServerErrorException({message: err.message});
            }
        }
    }
}