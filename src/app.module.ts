import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { RatModule } from './rat/rat.module';
import { AdditionalServiceModule } from './additional_service/additional_service.module';
import { CustomerModule } from './customer/customer.module';
import { Rat } from './rat/entities/rat.entity';
import { Customer } from './customer/entities/customer.entity';
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
      entities: [Product, Rat, Customer],
      synchronize: true,
  }),
  ProductModule,
  RatModule,
  CustomerModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
