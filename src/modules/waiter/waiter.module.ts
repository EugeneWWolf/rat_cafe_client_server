import { TypeOrmModule } from "@nestjs/typeorm";
import { WaiterController } from "./controllers/waiter/waiter.controller";
import { Waiter } from "./entities/waiter.entity";
import { WaiterService } from "./services/waiter/waiter.service";
import { Module } from "@nestjs/common";
import { Rat } from "../rat/entities/rat.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Waiter, Rat])],
    controllers: [WaiterController],
    providers: [WaiterService]
  })
  export class WaiterModule {}