import { TodoService } from './service';
import { CreateTodoRequestDto, GetTodoDateRequestDto } from './dto/request.dtos';
import { TodoResponseDto } from './dto/response.dtos';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    createTodo(requestDto: CreateTodoRequestDto): Promise<TodoResponseDto>;
    getTodoByUsername(userName: string): Promise<TodoResponseDto[]>;
    deleteTodoByID(id: number): Promise<void>;
    updateTodoDate(id: number, bodyTodoDate: GetTodoDateRequestDto): Promise<TodoResponseDto>;
}
