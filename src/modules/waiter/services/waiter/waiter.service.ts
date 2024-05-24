import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, In, Repository } from "typeorm";
import { CreateWaiterDto } from "../../dto/create-waiter.dto";
import { UpdateWaiterDto } from "../../dto/update-watier.dto";
import { Waiter } from "../../entities/waiter.entity";
import { Rat } from "src/modules/rat/entities/rat.entity";

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

            const ratIDs = createWaiterDto.ratIDs;

            if (ratIDs) {
                const rats = await this.ratRepository.findBy({id: In(ratIDs)});
            
                if (!Array.isArray(rats) || rats.length === 0) {
                    Logger.error(`Error in create(): rat with IDs ${ratIDs} weren't found`);
                    throw new EntityNotFoundError(Rat, { id: ratIDs });
                }
    
                if (!waiter.rats) {
                    waiter.rats = [];
                }

                waiter.rats.push(...rats);
            }

            return this.waiterRepository.save(waiter);
        } catch (error) {
            Logger.error(`Error in create(): ${error}`);
            throw error;
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

    async findAllWaitersWithRats() {
        try {
            return await this.waiterRepository.find({relations: ['rats']});
        } catch (err) {
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
            await this.waiterRepository.findOneByOrFail({ id });

            await this.waiterRepository.update(id, updateWaiterDto);
        } catch(err) {
            Logger.error(`Error in update(): ${err.message}`);
            throw err;
        }
    }

    async addRatsToWaiter(id: number, ratIDs: number[]): Promise<Waiter> {
        try {
            const waiter = await this.waiterRepository.findOne({
                relations: {
                    rats: true,
                },
                where: { id: id }
            })

            const rats = await this.ratRepository.findBy({id: In(ratIDs)});

            if (!Array.isArray(rats) || rats.length === 0) {
                Logger.error(`Error in addRatsToWaiter(): rat with IDs ${ratIDs} weren't found`);
                throw new EntityNotFoundError(Rat, { id: ratIDs });
            }

            if (waiter.rats === undefined) {
                waiter.rats = [];
            }

            for (let i = 0; i < rats.length; i++) {
                if (waiter.rats.indexOf(rats[i]) === -1) {
                    waiter.rats.push(rats[i]);
                }
            }

            return await this.waiterRepository.save(waiter);
        } catch(err) {
            throw err;
        }
    }

    async remove(id: number): Promise<Waiter> {
        try {
            const waiter = await this.waiterRepository.findOne({
                relations: {
                    rats: true,
                },
                where: { id: id }
            })

            if (!waiter) {
                throw new EntityNotFoundError(Waiter, { id: id }); 
            }

            waiter.rats = [];

            await this.waiterRepository.save(waiter);

            return await this.waiterRepository.remove(waiter);
        } catch(err) {
            Logger.error(`Error in remove(): ${err.message}`);
            throw err;
        }
    }

    async removeRatsFromWaiter(id: number, ratIDs: number[]): Promise<Rat[]> {
        try {
            const waiter = await this.waiterRepository.findOne({
                relations: {
                    rats: true,
                },
                where: { id: id }
            })

            if (!waiter) {
                throw new EntityNotFoundError(Waiter, { id: id }); 
            }

            const ratsToBeDeleted = await this.ratRepository.findBy({id: In(ratIDs)});

            if (!Array.isArray(ratsToBeDeleted) || ratsToBeDeleted.length === 0) {
                Logger.error(`Error in removeRatsFromWaiter(): rat with IDs ${ratIDs} weren't found`);
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
            Logger.error(`Error in removeRatsFromWaiter(): ${err.message}`);
            throw err;
        }
    }
}