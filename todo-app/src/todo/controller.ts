import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { TasksService } from "./service";
import { CreateTaskReqDto, UpdateTaskReqDto } from "./dto/request.dtos";
import { TasksResDto, TaskResDto, SuccessResponseDto } from "./dto/response.dtos";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // create todo
  @Post()
  createTask(@Body() requestDto: CreateTaskReqDto): Promise<TaskResDto> {
    return this.tasksService.createTask(requestDto);
  }

  // get by id

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<TaskResDto> {
    return this.tasksService.getTaskById(id);
  }

  // get all todos for the username̦

  @Get("/:username")
  getTasksByUsername(
    @Param("username") username: string
  ): Promise<TasksResDto> {
    return this.tasksService.getAllTasksByUsername(username);
  }


  // delete todo for a username
  @Delete("/:id")
  deleteTaskByID(@Param("id", ParseIntPipe) id: number): SuccessResponseDto{
      this.tasksService.deleteById(id)

     return new SuccessResponseDto(true, `Task having id : ${id} is deleted successfully`)

  }
  // update todoDate for a particular todo

  @Put("/:id")
  updateTask(
    @Param("id") id: number,
    @Body() updateReqDto: UpdateTaskReqDto
  ): Promise<TaskResDto> {
    return this.tasksService.updateById(id, updateReqDto.dueDate);
  }
}
