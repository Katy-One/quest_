import { Game } from '../entities/game.entity'
import { Task } from '../entities/task.entity'
import { AppDataSource } from '../utils/data-source'

const gameRepository = AppDataSource.getRepository(Game)

export const createGame = async (game: Partial<Game>) => {
  return await gameRepository.save(gameRepository.create({ ...game }))
}

export const updateTeamsGame = async (teamId: Partial<string>, id: string) => {
  return gameRepository
    .createQueryBuilder()
    .relation(Game, 'users')
    .of(id)
    .add(teamId)
}
export const updateTaskGame = async (game: Partial<Game>, id: string) => {
  return gameRepository
    .createQueryBuilder()
    .relation(Game, 'tasks')
    .of(id)
    .add(game.tasks)
}
export const createTaskGame = async (task: Partial<Task>, id: string) => {
  return gameRepository
    .createQueryBuilder()
    .relation(Game, 'tasks')
    .of(id)
    .add(task)
}
export const updateDataGame = async (game: Partial<Game>, id: string) => {
  return gameRepository
    .createQueryBuilder()
    .update(Game)
    .set(game)
    .where('id = :id', { id: id })
    .returning('*')
    .updateEntity(true)
    .execute()
}
export const findGameById = async (gameId: string) => {
  return await gameRepository.findOne({
    where: {
      id: gameId,
    },
  })
}

export const getGame = async (id: string) => {
  return await gameRepository
    .createQueryBuilder('game')
    .where('user.id = :id', { id: id })
    .getOne()
}
export const findIsNotLoginUser = async (id: string) => {
  return await gameRepository
    .createQueryBuilder('game')
    .leftJoinAndSelect('game.users', 'user')
    .where('game.id = :id', { id })
    .andWhere('user.isLogin = :isLogin', { isLogin: false })
    .getOne()
}
export const findIsActiveTask = async (id: string) => {
  return await gameRepository
    .createQueryBuilder('game')
    .leftJoinAndSelect('game.tasks', 'task')
    .where('game.id = :id', { id })
    .andWhere('task.isActive = :isActive', { isActive: true })
    .getOne()
}
export const getFullGame = async (id: string) => {
  return await gameRepository.findOne({
    where: { id: id },
    relations: ['users', 'tasks', 'tasks.hints'],
  })
}
export const getFullGameWithNoneActiveUsers = async (id: string) => {
  return await gameRepository.findOne({
    where: { id: id, users: [{ isActive: false }] },
    relations: ['users', 'tasks', 'tasks.hints'],
  })
}
export const deleteTeamGame = async (id: string) => {
  return gameRepository
    .createQueryBuilder()
    .relation(Game, 'users')
    .of(id)
    .delete()
}
export const deleteGameById = async (id: string) => {
  return gameRepository
    .createQueryBuilder('game')
    .delete()
    .from(Game)
    .where('id = :id', { id: id })
    .execute()
}
export const deleteTeamGameById = async (idGame: string, idUser: string) => {
  await gameRepository
    .createQueryBuilder()
    .relation(Game, 'users')
    .of({ id: idGame })
    .remove(idUser)
}

export const getGames = async () => {
  return await gameRepository.find({
    relations: ['users', 'tasks', 'tasks.hints'],
  })
}

export const getGameByUser = async (id: string) => {
  return await gameRepository.findOne({
    where: {
      users: { id },
    },
    relations: ['users'],
  })
}
