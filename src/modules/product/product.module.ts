import { Module } from '@nestjs/common';
import { FoodController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FoodController],
  providers: [ProductService]
})
export class ProductModule {}
