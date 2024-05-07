import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {  
        try {
            const customer = this.customerRepository.create(createCustomerDto);

            return await this.customerRepository.save(customer);
        } catch(err) {
            throw err;
        }
    }

    async findAll(): Promise<Customer[]> {
        const customer = await this.customerRepository.find();

        if (!customer) {
            throw new NotFoundError("Couldn't find data: database is empty");
        }

        return await customer;
    }

    async findOne(id: number): Promise<Customer> {
        return await this.customerRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<void> {
        const customer = await this.customerRepository.findOneBy({ id })
            .catch(error => {throw error});
    
        if (!customer) {
            throw new NotFoundError(`Couldn't update data: no item with such id (${id})`);
        }

        try {
            await this.customerRepository.update(id, updateCustomerDto);
        } catch(err) {
            throw err;
        }
    }

    async remove(id: number): Promise<Customer> {
        const customer = await this.customerRepository.findOneBy({ id });
    
        if (!customer) {
            throw new NotFoundError(`Couldn't remove data: no item with such id (${id})`);
        }

        try {
            return await this.customerRepository.remove(customer);
        } catch(err) {
            throw err;
        }
    }
}
