import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { UpdateTodoListDto } from '../dto/update-todo-list.dto';
import { TodoListEntity } from '../entities/todo-list.entity';

@Injectable()
export class TodoListsService {
  constructor(
    @InjectRepository(TodoListEntity)
    private baseRepository: Repository<TodoListEntity>
  ) {}

  create(createTodoListDto: CreateTodoListDto) {
    return this.baseRepository.save(createTodoListDto);
  }

  findAll() {
    return this.baseRepository.find();
  }

  findOne(id: string) {
    return this.baseRepository.findOneOrFail({
      relations: { items: true },
      where: { id },
    });
  }

  update(id: string, updateTodoListDto: UpdateTodoListDto) {
    return this.baseRepository.save({ id, ...updateTodoListDto });
  }

  remove(id: string) {
    return this.baseRepository.delete(id);
  }
}
