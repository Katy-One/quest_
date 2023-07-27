import { NextFunction, Request, Response } from 'express'
import { Task } from '../entities/task.entity'

import { DeleteTaskInput, UpdateTaskInput } from '../schemas/task.schema'
import {
  createTaskGame,
  findGameById,
  getFullGame,
} from '../services/game.service'
import {
  createHint,
  createTask,
  deleteTaskById,
  findTaskById,
  updateDataTask,
  updateHintTask,
} from '../services/task.service'
import AppError from '../utils/appError'
import { AppDataSource } from '../utils/data-source'

export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await createTask(req.body)

    const game = await findGameById(req.body.gameId)

    if (!task) {
      return next(new AppError(404, 'Task with that ID not found'))
    }
    if (!game) {
      return next(new AppError(404, 'Game with that ID not found'))
    }
    await createTaskGame(task, game.id)
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

export const deleteTaskHandler = async (
  req: Request<DeleteTaskInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await findTaskById(req.params.id)

    if (!task) {
      return next(new AppError(404, 'Task with that ID not found'))
    }

    await deleteTaskById(task.id)

    res.status(200).json({
      status: 'success',
      data: true,
    })
  } catch (err) {
    next(err)
  }
}

export const updateTaskHandler = async (
  req: Request<UpdateTaskInput['params'], {}, UpdateTaskInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await findTaskById(req.params.id)

    const {
      taskName,
      answerFormat,
      description,
      correctAnswer,
      order,
    } = req.body
    if (!task) {
      return next(new AppError(404, 'Task with that ID not found'))
    }

    let taskUpdated = await updateDataTask(
      { taskName, answerFormat, description, correctAnswer, order },
      task.id,
    )

    const taskRepository = AppDataSource.getRepository(Task)
    if (req.body.hints) {
      for (let i = 0; i < req.body.hints.length; i++) {
        if (req.body.hints[i].id) {
          await updateHintTask(req.body.hints[i], task.id)
        } else {
          const hint = await createHint(req.body.hints[i])
          hint.task = task
          await taskRepository.manager.save(hint)
        }
      }
    }

    const fullGame = await getFullGame(taskUpdated.raw.gameId)

    res.status(201).json(fullGame)
  } catch (err) {
    next(err)
  }
}
