import { NextFunction, Request, Response } from 'express'
import { Game } from '../entities/game.entity'
import { User } from '../entities/user.entity'

import {
  DeleteGameInput,
  DeleteGameTeamInput,
  GetGameInput,
  UpdateMessageInput,
  UpdateStatusInput,
  UpdateTeamInput,
} from '../schemas/game.schema'
import {
  createGame,
  deleteGameById,
  deleteTeamGameById,
  findGameById,
  getFullGame,
  getFullGameWithNoneActiveUsers,
  getGames,
  updateDataGame,
  updateTeamsGame,
} from '../services/game.service'
import { findUserById, updateUserActivity } from '../services/user.service'
import AppError from '../utils/appError'
import { AuthUsers } from '../utils/authUsers'
import { AppDataSource } from '../utils/data-source'

export const createGameHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let user = res.locals.user
    const createGameData = { ...req.body, author: user.username }
    const game = await createGame(createGameData)

    await AppDataSource.createQueryBuilder()
      .relation(Game, 'user')
      .of(game.id)
      .set(user)
    res.status(201).json(game)
  } catch (err) {
    next(err)
  }
}

export const getGamesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const games = await getGames()

    res.status(200).json(games)
  } catch (err) {
    next(err)
  }
}
export const getGameHandler = async (
  req: Request<GetGameInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await getFullGame(req.params.id)

    if (!game) {
      return next(new AppError(404, 'Game with that ID not found'))
    }

    res.status(200).json(game)
  } catch (err) {
    next(err)
  }
}
export const getGameWithNoneActiveUsersHandler = async (
  req: Request<GetGameInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await getFullGameWithNoneActiveUsers(req.params.id)

    if (!game) {
      return next(new AppError(404, 'Game with that ID not found'))
    }

    res.status(200).json(game)
  } catch (err) {
    next(err)
  }
}

export const updateStatusHandler = async (
  req: Request<UpdateStatusInput['params'], {}, UpdateStatusInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await getFullGame(req.params.id)

    let isActive = true
    if (game?.isActive) {
      isActive = false
    }

    if (!game) {
      return next(new AppError(404, 'Game with that ID not found'))
    }
    const response = AuthUsers.checkUserActivity(game.users)
    console.log(response)
    await updateDataGame({ isActive: isActive }, game.id)

    const isUserActive = game.users.filter((user) => user.isActive === true)

    if (isUserActive.length) {
      return next(new AppError(409, 'Some user is already active'))
    }
    const updatedGame = await getFullGame(req.params.id)

    res.status(201).json(updatedGame)
  } catch (err) {
    next(err)
  }
}

export const updateMessageHandler = async (
  req: Request<UpdateMessageInput['params'], {}, UpdateMessageInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await findGameById(req.params.id)

    if (!game) {
      return next(new AppError(404, 'Game with that ID not found'))
    }

    await updateDataGame({ finalMessage: req.body.finalMessage }, game.id)

    const users = await getFullGame(game.id)

    res.status(201).json(users)
  } catch (err) {
    next(err)
  }
}

export const updateTeamHandler = async (
  req: Request<UpdateTeamInput['params'], {}, UpdateTeamInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await findGameById(req.params.id)

    if (!game) {
      return next(new AppError(404, 'Game with that ID not found'))
    }

    if (req.body.id) {
      const user = await findUserById(req.body.id)

      if (!user) {
        return next(new AppError(404, `User with that id not found'}`))
      } else {
        await updateUserActivity(user.id, true)
        await updateTeamsGame(req.body.id, game.id)
      }
      // console.log(user)
      // if (user?.isActive) {
      //   return next(new AppError(404, 'This user is already active'))
      // }
    } else {
      return next(new AppError(400, ` id is required`))
    }

    const updatedGame = await getFullGame(game.id)

    res.status(201).json(updatedGame)
  } catch (err) {
    next(err)
  }
}

export const deleteTeamGameHandler = async (
  req: Request<DeleteGameTeamInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await findGameById(req.params.idGame)

    if (!game) {
      return next(new AppError(404, 'Game with that ID not found'))
    }
    await updateUserActivity(req.params.idTeam, false)
    await deleteTeamGameById(game.id, req.params.idTeam)

    res.status(200).json({
      status: 'success',
      data: true,
    })
  } catch (err) {
    next(err)
  }
}
export const deleteGameHandler = async (
  req: Request<DeleteGameInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await findGameById(req.params.id)

    if (!game) {
      return next(new AppError(404, 'Game with that ID not found'))
    }

    await deleteGameById(game.id)

    res.status(200).json({
      status: 'success',
      data: true,
    })
  } catch (err) {
    next(err)
  }
}
