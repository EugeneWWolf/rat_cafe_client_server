import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, In, Repository } from "typeorm";
import { CreateWaiterDto } from "../../dto/create-waiter.dto";
import { UpdateWaiterDto } from "../../dto/update-watier.dto";
import { Waiter } from "../../entities/waiter.entity";
import { Rat } from "src/modules/rat/entities/rat.entity";

@Injectable()
export class WaiterService {
    private readonly logger = new Logger(WaiterService.name);

    constructor(
        @InjectRepository(Waiter)
        private readonly waiterRepository: Repository<Waiter>,

        @InjectRepository(Rat)
        private readonly ratRepository: Repository<Rat>,
    ) {}

    async create(createWaiterDto: CreateWaiterDto): Promise<Waiter> {  
        try {
            const waiter = this.waiterRepository.create(createWaiterDto);

            const ratIDs = createWaiterDto.ratIDs;

            if (ratIDs) {
                const rats = await this.ratRepository.findBy({id: In(ratIDs)});
            
                if (rats.length === 0) {
                    throw new EntityNotFoundError(Rat, { id: ratIDs });
                }

                if (!waiter.rats) {
                    waiter.rats = [];
                }

                waiter.rats.push(...rats);
            }

            return this.waiterRepository.save(waiter);
        } catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }

    async findAll(): Promise<Waiter[]> {
        try {
            return await this.waiterRepository.find();
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async findAllWaitersWithRats() {
        try {
            return await this.waiterRepository.find({relations: ['rats']});
        } catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async findOne(id: number): Promise<Waiter> {
        try {
            return await this.waiterRepository.findOneByOrFail({ id });
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async update(id: number, updateWaiterDto: UpdateWaiterDto): Promise<void> {
        try {
            await this.waiterRepository.findOneByOrFail({ id });

            await this.waiterRepository.update(id, updateWaiterDto);
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async addRatsToWaiter(id: number, ratIDs: number[]): Promise<Waiter> {
        try {
            const waiter = await this.waiterRepository.findOne({
                relations: {
                    rats: true,
                },
                where: { id }
            })

            const ratsToBeAdded = await this.ratRepository.findBy({id: In(ratIDs)});

            if (ratsToBeAdded.length === 0) {
                throw new EntityNotFoundError(Rat, { id: ratIDs });
            }

            if (!waiter.rats) {
                waiter.rats = [];
            }

            for (let i = 0; i < ratsToBeAdded.length; i++) {
                if (waiter.rats.indexOf(ratsToBeAdded[i]) === -1) {
                    waiter.rats.push(ratsToBeAdded[i]);
                }
            }

            return await this.waiterRepository.save(waiter);
        } catch(err) {
            this.logger.error(err);
            throw err;
        }
    }

    async remove(id: number): Promise<Waiter> {
        try {
            const waiter = await this.waiterRepository.findOne({
                relations: {
                    rats: true,
                },
                where: { id }
            })

            if (!waiter) {
                throw new EntityNotFoundError(Waiter, { id }); 
            }

            return await this.waiterRepository.remove(waiter);
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async removeRatsFromWaiter(id: number, ratIDs: number[]): Promise<Rat[]> {
        try {
            const waiter = await this.waiterRepository.findOne({
                relations: {
                    rats: true,
                },
                where: { id }
            })

            if (!waiter) {
                throw new EntityNotFoundError(Waiter, { id }); 
            }

            const ratsToBeDeleted = await this.ratRepository.findBy({id: In(ratIDs)});

            if (ratsToBeDeleted.length === 0) {
                this.logger.error(`Rat with IDs ${ratIDs} weren't found`);
                throw new EntityNotFoundError(Rat, { id: ratIDs });
            }

            waiter.rats = waiter.rats.filter((rat) => {
                if (!ratIDs.includes(rat.id)) {
                    return rat
                }
            })

            await this.waiterRepository.save(waiter);

            return ratsToBeDeleted;
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }
}