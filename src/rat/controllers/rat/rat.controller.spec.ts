import { Test, TestingModule } from '@nestjs/testing';
import { RatController } from './rat.controller';

describe('RatController', () => {
  let controller: RatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatController],
    }).compile();

    controller = module.get<RatController>(RatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
