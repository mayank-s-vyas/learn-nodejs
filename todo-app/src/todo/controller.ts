import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
  import { TodoService } from './service';
  import {
    CreateTodoRequestDto,
    GetTodoDateRequestDto,
  } from './dto/request.dtos';
  import { TodoResponseDto } from './dto/response.dtos';
  
  @Controller('todo')
  export class TodoController {
    constructor(private todoService: TodoService) {}
  
    // create todo
    @Post()
    createTodo(
      @Body() requestDto: CreateTodoRequestDto,
    ): Promise<TodoResponseDto> {
      return this.todoService.createTodo(requestDto);
    }
  
    // get all todos for the username̦
  
    @Get('/:userName')
    getTodoByUsername(
      @Param('userName') userName: string,
    ): Promise<TodoResponseDto[]> {
      return this.todoService.getTodoByUsername(userName);
    }
  
    // delete todo for a username
    @Delete('/:id')
    deleteTodoByID(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
      return this.todoService.deleteTodoById(id);
    }
    // update todoDate for a particular todo
  
    @Put('/:id')
    updateTodoDate(
      @Param('id') id: number,
      @Body() bodyTodoDate: GetTodoDateRequestDto,
    ): Promise<TodoResponseDto> {
      return this.todoService.updateTodoDate(id, bodyTodoDate.todoDate);
    }
  }
  