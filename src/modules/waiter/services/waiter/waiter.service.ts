import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, In, Repository } from "typeorm";
import { CreateWaiterDto } from "../../dto/create-waiter.dto";
import { UpdateWaiterDto } from "../../dto/update-watier.dto";
import { Waiter } from "../../entities/waiter.entity";
import { Rat } from "src/modules/rat/entities/rat.entity";
import { CreateWaiterWithRatsDto } from "../../dto/create-waiter-with-rats.dto";

@Injectable()
export class WaiterService {
    constructor(
        @InjectRepository(Waiter)
        private readonly waiterRepository: Repository<Waiter>,
        @InjectRepository(Rat)
        private readonly ratRepository: Repository<Rat>,
    ) {}

    async create(createWaiterDto: CreateWaiterDto): Promise<Waiter> {  
        try {
            const waiter = this.waiterRepository.create(createWaiterDto);

            return await this.waiterRepository.save(waiter);
        } catch(err) {
            Logger.error(`Error in create(): ${err.message}`);
            throw err;
        }
    }

    async findAll(): Promise<Waiter[]> {
        try {
            return await this.waiterRepository.find();
        } catch(err) {
            Logger.error(`Error in findAll(): ${err.message}`);
            throw err;
        }
    }

    async findOne(id: number): Promise<Waiter> {
        try {
            return await this.waiterRepository.findOneByOrFail({ id });
        } catch(err) {
            Logger.error(`Error in findOne(): ${err.message}`);
            throw err;
        }
    }

    async update(id: number, updateWaiterDto: UpdateWaiterDto): Promise<void> {
        try {
            await this.waiterRepository.findOneByOrFail({ id })
        } catch(err) {
            Logger.error(`Error in update(): ${err.message}`);
            throw err;
        }

        try {
            await this.waiterRepository.update(id, updateWaiterDto);
        } catch(err) {
            Logger.error(`Error in update(): ${err.message}`);
            throw err;
        }
    }

    async remove(id: number): Promise<Waiter> {
        let waiter: Waiter;

        try {
            waiter = await this.waiterRepository.findOneByOrFail({ id })
        } catch(err) {
            Logger.error(`Error in remove(): ${err.message}`);
            throw err;
        }

        try {
            return await this.waiterRepository.remove(waiter);
        } catch(err) {
            Logger.error(`Error in remove(): ${err.message}`);
            throw err;
        }
    }

    async createWaiterWithRats(createWaiterWithRatsDto: CreateWaiterWithRatsDto) {
        const ratIDs = createWaiterWithRatsDto.ratIDs;

        const rats = await this.ratRepository.findBy({id: In(ratIDs)});
        
        if (!Array.isArray(rats) || rats.length === 0) {
            Logger.error(`Error in createWaiterWithRats(): rat with IDs ${ratIDs} weren't found`);
            Logger.error(new EntityNotFoundError(Rat, { id: ratIDs }));
            throw new EntityNotFoundError(Rat, { id: ratIDs });
        }

        try {

            const waiter = this.waiterRepository.create(createWaiterWithRatsDto);

            waiter.rats.push(...rats);

            return this.waiterRepository.save(waiter);
        } catch (error) {
            Logger.error(`Error in createWaiterWithRats(): ${error}`);
            throw error;
        }
    }
}