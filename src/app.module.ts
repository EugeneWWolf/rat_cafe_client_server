import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food/entities/food.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1488',
      database: 'rat_cafe',
      entities: [Food],
      synchronize: true,
  }),
  FoodModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
