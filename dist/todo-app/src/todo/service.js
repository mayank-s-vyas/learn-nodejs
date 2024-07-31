"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_entity_1 = require("./entity/todo.entity");
const typeorm_2 = require("typeorm");
const date_fns_1 = require("date-fns");
let TodoService = class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    isValidTodoDate(todoDate) {
        const currentDate = new Date();
        const inputTodoDate = new Date(todoDate);
        return (0, date_fns_1.startOfDay)(currentDate) < (0, date_fns_1.startOfDay)(inputTodoDate);
    }
    async createTodo(createTodoDto) {
        const { title, userName, todoDate } = createTodoDto;
        if (!this.isValidTodoDate(todoDate)) {
            throw new common_1.BadRequestException('The Todo Date must be in future.');
        }
        const todo = this.todoRepository.create({
            title,
            userName,
            todoDate,
        });
        await this.todoRepository.save(todo);
        return todo;
    }
    async getTodoByUsername(userName) {
        const todos = await this.todoRepository.find({
            where: {
                userName: userName,
            },
        });
        if (todos.length === 0) {
            throw new common_1.NotFoundException(`Username : ${userName} not found.`);
        }
        return todos;
    }
    async deleteTodoById(id) {
        const output = await this.todoRepository.delete(id);
        if (output.affected === 0) {
            throw new common_1.NotFoundException(`No todo is available for the given ID : ${id} `);
        }
    }
    async updateTodoDate(id, newTodoDate) {
        if (!this.isValidTodoDate(newTodoDate)) {
            throw new common_1.BadRequestException('The Todo Date must be a future date.');
        }
        const output = await this.todoRepository.findOneBy({ id: id });
        if (!output) {
            throw new common_1.NotFoundException(`No todo is available for given ID : ${id}`);
        }
        output.todoDate = newTodoDate;
        return this.todoRepository.save(output);
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoService);
//# sourceMappingURL=service.js.map