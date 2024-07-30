import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoRequestDto } from './dto/request.dtos';
import { TodoResponseDto } from './dto/response.dtos';
export declare class TodoService {
    private todoRepository;
    constructor(todoRepository: Repository<Todo>);
    private isValidTodoDate;
    createTodo(createTodoDto: CreateTodoRequestDto): Promise<TodoResponseDto>;
    getTodoByUsername(userName: string): Promise<TodoResponseDto[]>;
    deleteTodoById(id: number): Promise<void>;
    updateTodoDate(id: number, newTodoDate: Date): Promise<TodoResponseDto>;
}
