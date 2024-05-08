import { Test, TestingModule } from '@nestjs/testing';
import { RatController } from './rat.controller';
import { RatService } from '../../services/rat/rat.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

describe('RatController', () => {
  let controller: RatController;
  let service: DeepMocked<RatService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatController],
      providers: [RatService]
    })
    .overrideProvider(RatService)
    .useValue(createMock<RatService>())
    .compile();

    controller = module.get<RatController>(RatController);
    service = module.get(RatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});