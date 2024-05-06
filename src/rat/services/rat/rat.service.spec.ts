import { Test, TestingModule } from '@nestjs/testing';
import { RatService } from './rat.service';

describe('RatService', () => {
  let service: RatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatService],
    }).compile();

    service = module.get<RatService>(RatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
