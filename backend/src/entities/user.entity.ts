import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { object, string, TypeOf } from 'zod'
import { Game } from './game.entity'
import { UserGame } from './user-game.entity'

import UserModel from './user-model.entity'
export enum RoleEnumType {
  USER = 'team_user',
  ADMIN = 'admin',
}
@Entity()
export class User extends UserModel {
  @Column('boolean', { default: true })
  isActive: boolean = false

  @Column({ nullable: true })
  motto: string

  @Column('boolean', { default: false })
  isLogin: boolean = false

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType

  @ManyToMany(() => Game, (game) => game.users, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  games: Game[]

  @OneToMany(() => UserGame, (userGame) => userGame.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userGame: UserGame[]

  toJSON() {
    return { ...this, password: undefined }
  }
}
