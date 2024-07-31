import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskModule } from "./todo/module";

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "todo-app",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
