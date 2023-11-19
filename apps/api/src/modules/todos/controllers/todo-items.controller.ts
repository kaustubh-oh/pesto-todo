import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { TodoItemsService } from '../services/todo-items.service';
import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { UpdateTodoItemDto } from '../dto/update-todo-item.dto';

@Controller('todo-items')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post()
  create(@Body(ValidationPipe) createTodoItemDto: CreateTodoItemDto) {
    return this.todoItemsService.create(createTodoItemDto);
  }

  @Get()
  findAll() {
    return this.todoItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoItemsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTodoItemDto: UpdateTodoItemDto
  ) {
    return this.todoItemsService.update(id, updateTodoItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoItemsService.remove(id);
  }
}
