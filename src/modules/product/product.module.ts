import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
