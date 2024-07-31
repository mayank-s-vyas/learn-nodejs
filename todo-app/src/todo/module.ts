import { Module } from "@nestjs/common";
import { TasksService } from "./service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entity/entity";
import { TasksController } from "./controller";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
