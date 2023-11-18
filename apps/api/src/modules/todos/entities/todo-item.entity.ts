import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoListEntity } from './todo-list.entity';
import { TASK_STATUS_ENUM } from '@pesto/shared';

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

  @Column({
    type: 'enum',
    enum: TASK_STATUS_ENUM,
    default: TASK_STATUS_ENUM.TODO,
  })
  status: TASK_STATUS_ENUM;

  @Column({ select: false })
  list_id: string;

  @ManyToOne(() => TodoListEntity, (list) => list.items, {
    nullable: true,
  })
  list: TodoListEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
