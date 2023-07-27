import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Game } from './game.entity'
import { Hint } from './hint.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  taskName: string

  @Column()
  answerFormat: string

  @Column()
  description: string

  @Column()
  correctAnswer: string

  @Column({ nullable: true })
  order: number

  @Column('boolean', { default: true })
  isActive: boolean = false

  @OneToMany(() => Hint, (hint) => hint.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  hints: Hint[]

  @ManyToOne(() => Game, (game) => game.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  game: Game
}
