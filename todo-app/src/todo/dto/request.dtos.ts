import { Type } from 'class-transformer';
import { IsISO8601, IsString } from 'class-validator';


export class CreateTodoRequestDto {
  @IsString()
  title: string;

  @IsString()
  userName: string;

  @IsISO8601()
  todoDate: Date;
}


export class GetTodoDateRequestDto {

  @IsISO8601()
  @Type(() => Date)
  todoDate: Date;

}