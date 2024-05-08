import { Test, TestingModule } from '@nestjs/testing';
import { WaiterService } from './waiter.service';
import { Waiter } from '../../entities/waiter.entity';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('WaiterService', () => {
  let service: WaiterService;
  let repositoryMock = createMock<Repository<Waiter>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaiterService,
        {
          provide: getRepositoryToken(Waiter),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<WaiterService>(WaiterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
