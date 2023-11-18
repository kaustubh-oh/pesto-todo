import { Module } from '@nestjs/common';
import { TodoListsModule } from './todo-lists/todo-lists.module';
import { TodoItemsModule } from './todo-items/todo-items.module';

@Module({
  imports: [TodoListsModule, TodoItemsModule]
})
export class TodosModule {}
