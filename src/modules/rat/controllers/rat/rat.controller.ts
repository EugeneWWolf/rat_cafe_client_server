import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseFilters } from "@nestjs/common";
import { Response } from 'express';
import { sendNoContentStatusCode } from "src/utility/controller_helpers/sendNoContentStatusCode";
import { DatabaseExceptionFilter } from "src/utility/exception_filters/DatabaseException.filter";
import { CreateRatDto } from "../../dto/create-rat.dto";
import { UpdateRatDto } from "../../dto/update-rat.dto";
import { Rat } from "../../entities/rat.entity";
import { RatService } from "../../services/rat/rat.service";

@Controller('rat')
@UseFilters(DatabaseExceptionFilter)
export class RatController {
    constructor(private readonly ratService: RatService) {}

    @Post()
    async create(@Body() createRatDto: CreateRatDto): Promise<Rat> {
        return await this.ratService.create(createRatDto);
    }

    @Get()
    async findAll(): Promise<Rat[]> {
        return await this.ratService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Rat> {
        return await this.ratService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateRatDto: UpdateRatDto, @Res() res: Response): Promise<void> {
        await this.ratService.update(id, updateRatDto);
    
        sendNoContentStatusCode(res, 'update');
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Rat> {
        return await this.ratService.remove(id);
    }
}