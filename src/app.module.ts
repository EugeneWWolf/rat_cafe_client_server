import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './modules/product/entities/product.entity';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1488',
      database: 'rat_cafe',
      entities: [Product],
      synchronize: true,
  }),
  ProductModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
