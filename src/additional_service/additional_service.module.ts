import { Module } from '@nestjs/common';
import { AdditionalServiceController } from './controllers/additional_service/additional_service.controller';
import { AdditionalServiceService } from './services/additional_service/additional_service.service';
import { AdditionalService } from './entities/additional_service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalService])],
  controllers: [AdditionalServiceController],
  providers: [AdditionalServiceService]
})
export class AdditionalServiceModule {}
