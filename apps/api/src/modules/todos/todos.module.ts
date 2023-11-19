import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemsController } from './controllers/todo-items.controller';
import { TodoItemEntity } from './entities/todo-item.entity';
import { TodoListEntity } from './entities/todo-list.entity';
import { TodoItemsService } from './services/todo-items.service';
import { TodoListsService } from './services/todo-lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListEntity, TodoItemEntity])],
  controllers: [TodoItemsController],
  providers: [TodoListsService, TodoItemsService],
})
export class TodosModule {}
