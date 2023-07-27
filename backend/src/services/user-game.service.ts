import { Game } from '../entities/game.entity'
import { Task } from '../entities/task.entity'
import { UserGame } from '../entities/user-game.entity'
import { User } from '../entities/user.entity'
import { AppDataSource } from '../utils/data-source'

const userGameRepository = AppDataSource.getRepository(UserGame)

export const createUserGame = async (userGame: Partial<Game>) => {
  return await userGameRepository.save(
    userGameRepository.create({ ...userGame }),
  )
}

export const getUserGame = async (props: {
  user: { id: string }
  game: { id: string }
}) => {
  return await userGameRepository.findOne({
    where: props,
    relations: ['user', 'game', 'task', 'game.tasks', 'game.tasks.hints'],
  })
}
export const getUsersGame = async () => {
  return await userGameRepository.createQueryBuilder('userGame').getMany()
}
export const updateUserGameTask = async (id: string, task: Task | null) => {
  return userGameRepository
    .createQueryBuilder('userGame')
    .update(UserGame)
    .set({ task })
    .where('id = :id', { id: id })
    .execute()
}
