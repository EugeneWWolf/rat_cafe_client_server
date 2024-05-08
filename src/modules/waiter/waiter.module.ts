import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WaiterController } from "./controllers/waiter/waiter.controller";
import { Waiter } from "./entities/waiter.entity";
import { WaiterService } from "./services/waiter/waiter.service";

@Module({
    imports: [TypeOrmModule.forFeature([Waiter])],
    controllers: [WaiterController],
    providers: [WaiterService]
  })
export class WaiterModule {}