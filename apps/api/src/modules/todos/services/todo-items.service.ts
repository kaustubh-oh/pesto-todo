import { Injectable } from '@nestjs/common';
import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { UpdateTodoItemDto } from '../dto/update-todo-item.dto';
import { TodoItemEntity } from '../entities/todo-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectRepository(TodoItemEntity)
    private baseRepository: Repository<TodoItemEntity>
  ) {}

  create(createTodoItemDto: CreateTodoItemDto) {
    return this.baseRepository.save(createTodoItemDto);
  }

  findAll() {
    return this.baseRepository.find();
  }

  findOne(id: string) {
    return this.baseRepository.findOneOrFail({
      relations: { list: true },
      where: { id },
    });
  }

  update(id: string, updateTodoItemDto: UpdateTodoItemDto) {
    return this.baseRepository.save({ id, ...updateTodoItemDto });
  }

  remove(id: string) {
    return this.baseRepository.delete(id);
  }
}
