import { Controller, UseFilters, Post, Body, Get, Param, ParseIntPipe, Patch, Res, HttpStatus, Logger, Delete } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseExceptionFilter } from 'src/utility/exception_filters/DatabaseException.filter';
import { CreateWaiterDto } from '../../dto/create-waiter.dto';
import { UpdateWaiterDto } from '../../dto/update-watier.dto';
import { Waiter } from '../../entities/waiter.entity';
import { WaiterService } from '../../services/waiter/waiter.service';
import { CreateWaiterWithRatsDto } from '../../dto/create-waiter-with-rats.dto';
import { ParseIntArrayPipe } from 'src/utility/custom_pipes/parseIntArrayPipe.pipe';

@Controller('waiter')
@UseFilters(DatabaseExceptionFilter)
export class WaiterController {
    constructor(private readonly waiterService: WaiterService) {}

    @Post()
    async create(@Body() createWaiterDto: CreateWaiterDto): Promise<Waiter> {
        return await this.waiterService.create(createWaiterDto);
    }

    // Окей, создадим апишку, в котором я в теле указываю крысу и он создаёт вейтера с крысами указанными (айдишниками их)
    // Но нужно пропарсить полученные айдишники и форматнуть их в нужный формат с помощью пайпа кастамного
    // До этого я делал лишь так с поиском элементов по айди, но как тело преобразовать да ебаный рот... О, класс валидатор
    
    @Post('/rats')
    async createWaiterWithRats(@Body() createWaiterWithRatsDto: CreateWaiterWithRatsDto, @Body('ratIDs', ParseIntArrayPipe) ratIDs: number[]) {
        createWaiterWithRatsDto.ratIDs = ratIDs;
        return await this.waiterService.createWaiterWithRats(createWaiterWithRatsDto);
    }

    @Get()
    async findAll(): Promise<Waiter[]> {
        return await this.waiterService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Waiter> {
        return await this.waiterService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateWaiterDto: UpdateWaiterDto, @Res() res: Response): Promise<void> {
        await this.waiterService.update(id, updateWaiterDto);
    
        try {
            res.status(HttpStatus.NO_CONTENT).send();
        } catch(err) {
            Logger.error(`Error in update(): ${err.message}`);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error: couldn't send response");
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Waiter> {
        return await this.waiterService.remove(id);
    }
}