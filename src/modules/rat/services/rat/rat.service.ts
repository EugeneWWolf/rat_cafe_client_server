import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rat } from "../../entities/rat.entity";
import { CreateRatDto } from "../../dto/create-rat.dto";
import { UpdateRatDto } from "../../dto/update-rat.dto";

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
            Logger.error(`Error in create(): ${err.message}`);
            throw err;
        }
    }

    async findAll(): Promise<Rat[]> {
        try {
            return await this.ratRepository.find();
        } catch(err) {
            Logger.error(`Error in findAll(): ${err.message}`);
            throw err;
        }
    }

    async findOne(id: number): Promise<Rat> {
        try {
            return await this.ratRepository.findOneByOrFail({ id });
        } catch(err) {
            Logger.error(`Error in findOne(): ${err.message}`);
            throw err;
        }
    }

    async update(id: number, updateRatDto: UpdateRatDto): Promise<void> {
        try {
            await this.ratRepository.findOneByOrFail({ id })
        } catch(err) {
            Logger.error(`Error in update(): ${err.message}`);
            throw err;
        }

        try {
            await this.ratRepository.update(id, updateRatDto);
        } catch(err) {
            Logger.error(`Error in update(): ${err.message}`);
            throw err;
        }
    }

    async remove(id: number): Promise<Rat> {
        let rat: Rat;

        try {
            rat = await this.ratRepository.findOneByOrFail({ id })
        } catch(err) {
            Logger.error(`Error in remove(): ${err.message}`);
            throw err;
        }

        try {
            return await this.ratRepository.remove(rat);
        } catch(err) {
            Logger.error(`Error in remove(): ${err.message}`);
            throw err;
        }
    }
}