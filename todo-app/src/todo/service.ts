import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entity/entity";
import { Repository } from "typeorm";
import { CreateTaskReqDto } from "./dto/request.dtos";
import { TasksResDto, TaskResDto } from "./dto/response.dtos";
import { DateUtils } from "../util/date.util";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async createTask(reqDto: CreateTaskReqDto): Promise<TaskResDto> {
    const { title, username, dueDate } = reqDto;

    if (!DateUtils.isDateInFuture(dueDate)) {
      throw new BadRequestException("Task Due Date must be in future.");
    }
    const task = this.taskRepository.create({
      title,
      username,
      dueDate,
    });
    await this.taskRepository.save(task);

    return task;
  }

  async getAllTasksByUsername(userName: string): Promise<TasksResDto> {
    const tasks = await this.taskRepository.find({
      where: {
        username: userName,
      },
    });

    if (tasks.length === 0) {
      throw new NotFoundException(`Username : ${userName} not found.`);
    }
    return { tasks };
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException(
        `No task is available for provided Id : ${id}`
      );
    }

    return task;
  }

  async deleteById(id: number): Promise<void> {
    const task = this.getTaskById(id);
    await this.taskRepository.delete(id);
  }

  async updateById(id: number, dueDate: Date): Promise<TaskResDto> {
    if (!DateUtils.isDateInFuture(dueDate)) {
      throw new BadRequestException("Due Date for task must be a future date.");
    }

    const output = await this.getTaskById(id);
    output.dueDate = dueDate;
    return this.taskRepository.save(output);
  }
}
