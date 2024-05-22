import { Body, Post, Get, Patch, Delete, Controller, UseFilters, Param, ParseIntPipe, Res, HttpStatus, Logger } from "@nestjs/common";
import { DatabaseExceptionFilter } from "src/utility/exception_filters/DatabaseException.filter";
import { RatService } from "../../services/rat/rat.service";
import { Response } from 'express';
import { CreateRatDto } from "../../dto/create-rat.dto";
import { Rat } from "../../entities/rat.entity";
import { UpdateRatDto } from "../../dto/update-rat.dto";

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
    
        try {
            res.status(HttpStatus.NO_CONTENT).send();
        } catch(err) {
            Logger.error(`Error in update(): ${err.message}`);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error: couldn't send response");
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Rat> {
        return await this.ratService.remove(id);
    }
}