import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Task } from './task.entity'

import { User } from './user.entity'

export enum StatusEnumType {
  ACTIVE = 'active',
  DISABLE = 'disable',
}
@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  gameName: string

  @Column({ nullable: true })
  isActive: boolean

  @Column({ nullable: true })
  finalMessage: string

  @Column({ nullable: true })
  author: string

  @Column({
    type: 'enum',
    enum: StatusEnumType,
    default: StatusEnumType.DISABLE,
  })
  status: StatusEnumType

  @ManyToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User

  @ManyToMany(() => User, (user) => user.games, {
    onDelete: 'CASCADE',
  })
  users: User[]

  @OneToMany(() => Task, (task) => task.game, {
    onDelete: 'CASCADE',
  })
  tasks: Task[]

  // async validate(): Promise<string[]> {
  //   const errors = await validate(this)
  //   const validationErrors = errors
  //     .map((error: ValidationError) => Object.values(error))
  //     .flat()
  //   if (!isValid(this.id)) {
  //     validationErrors.push('Invalid UUID')
  //   }
  //   return validationErrors
  // }
}
