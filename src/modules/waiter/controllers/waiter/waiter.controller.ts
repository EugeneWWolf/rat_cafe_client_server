import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { sendNoContentStatusCode } from 'src/utility/controller_helpers/sendNoContentStatusCode';
import { ParseIntArrayPipe } from 'src/utility/custom_pipes/parseIntArrayPipe.pipe';
import { DatabaseExceptionFilter } from 'src/utility/exception_filters/DatabaseException.filter';
import { CreateWaiterDto } from '../../dto/create-waiter.dto';
import { UpdateWaiterDto } from '../../dto/update-watier.dto';
import { Waiter } from '../../entities/waiter.entity';
import { WaiterService } from '../../services/waiter/waiter.service';

@Controller('waiter')
@UseFilters(DatabaseExceptionFilter)
export class WaiterController {
    constructor(private readonly waiterService: WaiterService) {}
    
    @Post()
    async create(@Body() createWaiterDto: CreateWaiterDto, @Body('ratIDs', new ParseIntArrayPipe(true)) ratIDs: number[]): Promise<Waiter> {
        createWaiterDto.ratIDs = ratIDs;
        return await this.waiterService.create(createWaiterDto);
    }

    @Get()
    async findAll(): Promise<Waiter[]> {
        return await this.waiterService.findAll();
    }

    @Get('rats')
    async findAllWaitersWithRats(): Promise<Waiter[]> {
        return await this.waiterService.findAllWaitersWithRats();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Waiter> {
        return await this.waiterService.findOne(id);
    }

    @Patch(':id/rats')
    async addRatsToWaiter(@Param('id', ParseIntPipe) id: number, @Body('ratIDs', new ParseIntArrayPipe(false)) ratIDs: number[], @Res() res: Response) {
        await this.waiterService.addRatsToWaiter(id, ratIDs);

        sendNoContentStatusCode(res, 'addRatsToWaiter');
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateWaiterDto: UpdateWaiterDto, @Res() res: Response): Promise<void> {
        await this.waiterService.update(id, updateWaiterDto);
    
        sendNoContentStatusCode(res, 'update');
    }

    @Delete(':id/rats')
    async deleteRatsFromWaiter(@Param('id', ParseIntPipe) id: number, @Body('ratIDs', new ParseIntArrayPipe(false)) ratIDs: number[]) {
        return await this.waiterService.removeRatsFromWaiter(id, ratIDs);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Waiter> {
        return await this.waiterService.remove(id);
    }
}