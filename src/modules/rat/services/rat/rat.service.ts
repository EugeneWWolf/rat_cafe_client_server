import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rat } from "../../entities/rat.entity";
import { CreateRatDto } from "../../dto/create-rat.dto";
import { UpdateRatDto } from "../../dto/update-rat.dto";

@Injectable()
export class RatService {
    private readonly logger = new Logger(RatService.name);

    constructor(
        @InjectRepository(Rat)
        private readonly ratRepository: Repository<Rat>,
    ) {}

    async create(createRatDto: CreateRatDto): Promise<Rat> {  
        try {
            const rat = this.ratRepository.create(createRatDto);

            return await this.ratRepository.save(rat);
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async findAll(): Promise<Rat[]> {
        try {
            return await this.ratRepository.find();
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async findOne(id: number): Promise<Rat> {
        try {
            return await this.ratRepository.findOneByOrFail({ id });
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async update(id: number, updateRatDto: UpdateRatDto): Promise<void> {
        try {
            await this.ratRepository.findOneByOrFail({ id });
            
            await this.ratRepository.update(id, updateRatDto);
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }

    async remove(id: number): Promise<Rat> {
        try {
            const rat = await this.ratRepository.findOneByOrFail({ id });
            return await this.ratRepository.remove(rat);
        } catch(err) {
            this.logger.error(err.message);
            throw err;
        }
    }
}