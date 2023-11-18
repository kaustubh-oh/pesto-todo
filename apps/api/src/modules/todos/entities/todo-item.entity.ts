import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoListEntity } from './todo-list.entity';

@Entity('todo-items')
export class TodoItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    default: '',
  })
  description: string;

  @Column({ select: false })
  list_id: string;

  @ManyToOne(() => TodoListEntity, (list) => list.items, {
    nullable: false,
  })
  list: TodoListEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
