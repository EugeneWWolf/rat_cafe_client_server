import { Injectable } from '@nestjs/common';
import { Waiter } from '../../entities/waiter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWaiterDto } from '../../dto/create-waiter.dto';
import { UpdateWaiterDto } from '../../dto/update-waiter.dto';

@Injectable()
export class WaiterService {
    constructor(
        @InjectRepository(Waiter)
        private readonly waiterRepository: Repository<Waiter>,
    ) {}

    async create(createWaiterDto: CreateWaiterDto): Promise<Waiter> {  
        try {
            const waiter = this.waiterRepository.create(createWaiterDto);

            return await this.waiterRepository.save(waiter);
        } catch(err) {
            throw err;
        }
    }

    async findAll(): Promise<Waiter[]> {
        const waiter = await this.waiterRepository.find();

        if (!waiter) {
            throw new NotFoundError("Couldn't find data: database is empty");
        }

        return await waiter;
    }

    async findOne(id: number): Promise<Waiter> {
        return await this.waiterRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateWaiterDto: UpdateWaiterDto): Promise<void> {
        const waiter = await this.waiterRepository.findOneBy({ id })
            .catch(error => {throw error});
    
        if (!waiter) {
            throw new NotFoundError(`Couldn't update data: no item with such id (${id})`);
        }

        try {
            await this.waiterRepository.update(id, updateWaiterDto);
        } catch(err) {
            throw err;
        }
    }

    async remove(id: number): Promise<Waiter> {
        const waiter = await this.waiterRepository.findOneBy({ id });
    
        if (!waiter) {
            throw new NotFoundError(`Couldn't remove data: no item with such id (${id})`);
        }

        try {
            return await this.waiterRepository.remove(waiter);
        } catch(err) {
            throw err;
        }
    }
}
