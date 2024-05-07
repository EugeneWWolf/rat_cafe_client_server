import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRatDto } from 'src/rat/dto/create-rat.dto';
import { UpdateRatDto } from 'src/rat/dto/update-rat.dto';
import { Rat } from 'src/rat/entities/rat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatService {
    constructor(
        @InjectRepository(Rat)
        private readonly ratRepository: Repository<Rat>,
    ) {}

    async create(createRatDto: CreateRatDto): Promise<Rat> {  
        try {
            const rat = this.ratRepository.create(createRatDto);

            return await this.ratRepository.save(rat);
        } catch(err) {
            throw err;
        }
    }

    async findAll(): Promise<Rat[]> {
        const rat = await this.ratRepository.find();

        if (!rat) {
            throw new NotFoundError("Couldn't find data: database is empty");
        }

        return await rat;
    }

    async findOne(id: number): Promise<Rat> {
        return await this.ratRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateProductDto: UpdateRatDto): Promise<void> {
        const rat = await this.ratRepository.findOneBy({ id })
            .catch(error => {throw error});
    
        if (!rat) {
            throw new NotFoundError(`Couldn't update data: no item with such id (${id})`);
        }

        try {
            await this.ratRepository.update(id, updateProductDto);
        } catch(err) {
            throw err;
        }
    }

    async remove(id: number): Promise<Rat> {
        const rat = await this.ratRepository.findOneBy({ id });
    
        if (!rat) {
            throw new NotFoundError(`Couldn't remove data: no item with such id (${id})`);
        }

        try {
            return await this.ratRepository.remove(rat);
        } catch(err) {
            throw err;
        }
    }
}
