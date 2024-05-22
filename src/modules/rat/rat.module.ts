import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rat } from "./entities/rat.entity";
import { RatController } from "./controllers/rat/rat.controller";
import { RatService } from "./services/rat/rat.service";

@Module({
  imports: [TypeOrmModule.forFeature([Rat])],
  controllers: [RatController],
  providers: [RatService]
})
export class RatModule {}