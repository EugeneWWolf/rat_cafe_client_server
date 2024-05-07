import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { Rat } from './rat/entities/rat.entity';
import { RatModule } from './rat/rat.module';
import { Customer } from './customer/entities/customer.entity';
import { CustomerModule } from './customer/customer.module';
import { AdditionalServiceModule } from './additional_service/additional_service.module';
import { AdditionalService } from './additional_service/entities/additional_service.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1488',
      database: 'rat_cafe',
      entities: [Product, Rat, Customer, AdditionalService],
      synchronize: true,
  }),
  ProductModule,
  RatModule,
  CustomerModule,
  AdditionalServiceModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
