import { Module } from '@nestjs/common';
import { TodoItemsController } from './controllers/todo-items.controller';
import { TodoListsController } from './controllers/todo-lists.controller';
import { TodoItemsService } from './services/todo-items.service';
import { TodoListsService } from './services/todo-lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListEntity } from './entities/todo-list.entity';
import { TodoItemEntity } from './entities/todo-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListEntity, TodoItemEntity])],
  controllers: [TodoListsController, TodoItemsController],
  providers: [TodoListsService, TodoItemsService],
})
export class TodosModule {}
