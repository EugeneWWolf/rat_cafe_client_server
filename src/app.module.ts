import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './modules/product/entities/product.entity';
import { ProductModule } from './modules/product/product.module';
import { Rat } from './modules/rat/entities/rat.entity';
import { RatModule } from './modules/rat/rat.module';
import { Waiter } from './modules/waiter/entities/waiter.entity';
import { WaiterModule } from './modules/waiter/waiter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1488',
      database: 'rat_cafe',
      entities: [Product, Rat, Waiter],
      synchronize: true,
  }),
  ProductModule,
  RatModule,
  WaiterModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
