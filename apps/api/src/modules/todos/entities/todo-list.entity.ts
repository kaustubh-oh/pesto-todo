import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoItemEntity } from './todo-item.entity';

@Entity('todo-lists')
export class TodoListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    default: '',
  })
  description: string;

  @OneToMany(() => TodoItemEntity, (todoItem) => todoItem.list)
  items: TodoItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
