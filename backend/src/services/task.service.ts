import { Game } from '../entities/game.entity'
import { Hint } from '../entities/hint.entity'
import { Task } from '../entities/task.entity'
import { AppDataSource } from '../utils/data-source'

const taskRepository = AppDataSource.getRepository(Task)
const hintRepository = AppDataSource.getRepository(Hint)
export const createTask = async (task: Partial<Task>) => {
  return await taskRepository.save(taskRepository.create({ ...task }))
}
export const createHint = async (hint: Partial<Task>) => {
  return await hintRepository.save(hintRepository.create({ ...hint }))
}
export const updateDataTask = async (task: Partial<Task>, id: string) => {
  return taskRepository
    .createQueryBuilder()
    .update(Task)
    .set(task)
    .where('id = :id', { id: id })
    .returning('*')
    .updateEntity(true)
    .execute()
}
export const updateHintTask = async (hint: Partial<Hint>, id: string) => {
  return taskRepository
    .createQueryBuilder()
    .update(Hint)
    .set({ hintDescription: hint.hintDescription, timeAppear: hint.timeAppear })
    .where('id = :id', { id: hint.id })
    .returning('*')
    .updateEntity(true)
    .execute()
}
export const updateTaskGame = async (game: Partial<Game>, id: string) => {
  return taskRepository
    .createQueryBuilder()
    .relation(Task, 'tasks')
    .of(id)
    .add(game.tasks)
}
export const updateHintsTask = async (hints: Partial<Hint>, id: string) => {
  return hintRepository
    .createQueryBuilder()
    .relation(Task, 'hints')
    .of(hints.id)
    .add(hints)
}
export const findTaskById = async (taskId: string) => {
  return await taskRepository.findOne({
    where: { id: taskId },
    relations: ['hints'],
  })
}
export const findTaskByOrder = async (order: number) => {
  return await taskRepository.findOne({
    where: { order },
    relations: ['hints'],
  })
}
// export const findTaskByCompleted = async () => {
//   return await taskRepository.findOne({
//     where: { completed: true },
//     relations: ['hints'],
//   })
// }

export const getTask = async (id: string) => {
  return await taskRepository
    .createQueryBuilder('task')
    .where('task.id = :id', { id: id })
    .getOne()
}

export const deleteTaskById = async (id: string) => {
  return taskRepository
    .createQueryBuilder('task')
    .delete()
    .from(Task)
    .where('id = :id', { id: id })
    .execute()
}

export const getTasks = async () => {
  return await taskRepository.createQueryBuilder('task').getMany()
}
