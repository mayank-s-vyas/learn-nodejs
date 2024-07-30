import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Todo } from '../entity/todo.entity';

export class TodoResponseDto {
  id: number;
  
  title: string;

  userName: string;

  todoDate: Date;
}
