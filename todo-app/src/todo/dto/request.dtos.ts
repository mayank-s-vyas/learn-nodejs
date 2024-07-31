import { Type } from "class-transformer";
import { IsISO8601, IsString } from "class-validator";

export class CreateTaskReqDto {
  @IsString()
  title: string;

  @IsString()
  username: string;

  @IsISO8601()
  dueDate: Date;
}

export class UpdateTaskReqDto {
  @IsISO8601()
  @Type(() => Date)
  dueDate: Date;
}
