import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateWaiterDto } from '../../dto/create-waiter.dto';
import { UpdateWaiterDto } from '../../dto/update-waiter.dto';
import { Waiter } from '../../entities/waiter.entity';
import { WaiterService } from '../../services/waiter/waiter.service';

@Controller('waiter')
export class WaiterController {
    constructor(private readonly waiterService: WaiterService) {}

    @Post()
    async create(@Body() createWaiterDto: CreateWaiterDto): Promise<Waiter> {
        try {
            return await this.waiterService.create(createWaiterDto);
        } catch (err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get()
    async findAll(): Promise<Waiter[]> {
        try {
            return await this.waiterService.findAll();
        } catch(err) {
            throw new InternalServerErrorException({message: err.message});
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Waiter> {
        try {
            return await this.waiterService.findOne(id);
        } catch(err) {
            throw new NotFoundException({message: err.message});
        }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateWaiterDto: UpdateWaiterDto): Promise<void> {
        try {
            await this.waiterService.update(id, updateWaiterDto);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException({message: err.message});
            } else {
                throw new InternalServerErrorException({message: err.message});
            }
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Waiter> {
        try {
            return await this.waiterService.remove(id);
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw new NotFoundException({message: err.message});
            } else {
                throw new InternalServerErrorException({message: err.message});
            }
        }
    }
}
