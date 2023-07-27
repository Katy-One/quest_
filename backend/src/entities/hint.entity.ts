import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Task } from './task.entity'

@Entity()
export class Hint {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  hintDescription: string

  @Column()
  timeAppear: string

  @ManyToOne(() => Task, (task) => task.hints, {
    onDelete: 'CASCADE',
  })
  task: Task
}
