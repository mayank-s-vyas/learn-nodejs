import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Todo } from './entity/todo.entity';
  import { Repository } from 'typeorm';
  import { CreateTodoRequestDto } from './dto/request.dtos';
  import { TodoResponseDto } from './dto/response.dtos';
  import { startOfDay } from 'date-fns';
  
  @Injectable()
  export class TodoService {
    constructor(
      @InjectRepository(Todo)
      private todoRepository: Repository<Todo>,
    ) {}
  
    private isValidTodoDate(todoDate: Date): Boolean {
      const currentDate = new Date();
      const inputTodoDate = new Date(todoDate);
  
      return startOfDay(currentDate) < startOfDay(inputTodoDate);
    }
  
    async createTodo(
      createTodoDto: CreateTodoRequestDto,
    ): Promise<TodoResponseDto> {
      const { title, userName, todoDate } = createTodoDto;
  
      if (!this.isValidTodoDate(todoDate)) {
        throw new BadRequestException('The Todo Date must be in future.');
      }
      const todo = this.todoRepository.create({
        title,
        userName,
        todoDate,
      });
      await this.todoRepository.save(todo);
  
      return todo;
    }
  
    async getTodoByUsername(userName: string): Promise<TodoResponseDto[]> {
      const todos = await this.todoRepository.find({
        where: {
          userName: userName,
        },
      });
  
      if (todos.length === 0) {
        throw new NotFoundException(`Username : ${userName} not found.`);
      }
      return todos;
    }
  
    async deleteTodoById(id: number): Promise<void> {
      const output = await this.todoRepository.delete(id);
  
      if (output.affected === 0) {
        throw new NotFoundException(
          `No todo is available for the given ID : ${id} `,
        );
      }
    }
  
    async updateTodoDate(
      id: number,
      newTodoDate: Date,
    ): Promise<TodoResponseDto> {
      if (!this.isValidTodoDate(newTodoDate)) {
        throw new BadRequestException('The Todo Date must be a future date.');
      }
  
      const output = await this.todoRepository.findOneBy({ id: id });
  
      if (!output) {
        throw new NotFoundException(`No todo is available for given ID : ${id}`);
      }
  
      output.todoDate = newTodoDate;
  
      return this.todoRepository.save(output);
    }
  }
  