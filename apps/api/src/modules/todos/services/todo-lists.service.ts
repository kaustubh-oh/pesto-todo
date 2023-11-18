import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { UpdateTodoListDto } from '../dto/update-todo-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoListEntity } from '../entities/todo-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoListsService {
  constructor(
    @InjectRepository(TodoListEntity)
    private baseRepository: Repository<TodoListEntity>
  ) {}

  create(createTodoListDto: CreateTodoListDto) {
    const todoList = this.baseRepository.save(createTodoListDto);

    console.log(todoList);

    return todoList;
  }

  findAll() {
    return this.baseRepository.findAndCount();
  }

  findOne(id: string) {
    return this.baseRepository.findOneByOrFail({ id });
  }

  update(id: string, updateTodoListDto: UpdateTodoListDto) {
    // return this.baseRepository.update(id, updateTodoListDto);
    return `This action updates a #${id} todoList`;
  }

  remove(id: number) {
    return this.baseRepository.delete(id);
  }
}
