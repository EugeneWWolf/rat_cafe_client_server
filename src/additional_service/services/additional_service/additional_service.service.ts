import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdditionalServiceDto } from 'src/additional_service/dto/create-additional-service.dto';
import { UpdateAdditionalServiceDto } from 'src/additional_service/dto/update-additional-service.dto';
import { AdditionalService } from 'src/additional_service/entities/additional_service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdditionalServiceService {
    constructor(
        @InjectRepository(AdditionalService)
        private readonly additionalServiceRepository: Repository<AdditionalService>,
    ) {}

    async create(createProductDto: CreateAdditionalServiceDto): Promise<AdditionalService> {  
        try {
            const additionalService = this.additionalServiceRepository.create(createProductDto);

            return await this.additionalServiceRepository.save(additionalService);
        } catch(err) {
            throw err;
        }
    }

    async findAll(): Promise<AdditionalService[]> {
        const additionalService = await this.additionalServiceRepository.find();

        if (!additionalService) {
            throw new NotFoundError("Couldn't find data: database is empty");
        }

        return await additionalService;
    }

    async findOne(id: number): Promise<AdditionalService> {
        return await this.additionalServiceRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateAdditionalServiceDto: UpdateAdditionalServiceDto): Promise<void> {
        const additionalService = await this.additionalServiceRepository.findOneBy({ id })
            .catch(error => {throw error});
    
        if (!additionalService) {
            throw new NotFoundError(`Couldn't update data: no item with such id (${id})`);
        }

        try {
            await this.additionalServiceRepository.update(id, updateAdditionalServiceDto);
        } catch(err) {
            throw err;
        }
    }

    async remove(id: number): Promise<AdditionalService> {
        const additionalService = await this.additionalServiceRepository.findOneBy({ id });
    
        if (!additionalService) {
            throw new NotFoundError(`Couldn't remove data: no item with such id (${id})`);
        }

        try {
            return await this.additionalServiceRepository.remove(additionalService);
        } catch(err) {
            throw err;
        }
    }
}
