import { IsBoolean, IsString } from "class-validator";

export class TaskResDto {
  id: number;
  title: string;
  username: string;
  dueDate: Date;
}

export class TasksResDto {
  tasks: TaskResDto[];
}

export class SuccessResponseDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  message: string;

  constructor(success, message) {
    this.success = success;
    this.message = message;
  }
}
