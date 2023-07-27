import { NextFunction, Request, Response } from 'express'
import { RoleEnumType, User } from '../entities/user.entity'
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../schemas/user.schema'
import {
  deleteUserById,
  findUserById,
  getUsers,
  getUsersNoActive,
} from '../services/user.service'
import AppError from '../utils/appError'
import { AppDataSource } from '../utils/data-source'

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let user = res.locals.user
    if (user.role === RoleEnumType.ADMIN) {
      user = {
        id: res.locals.user.id,
        password: res.locals.user.password,
        email: res.locals.user.email,
        username: res.locals.user.username,
        role: res.locals.user.role,
      }
    }
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export const getUsersHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const teams = await getUsers()

    res.status(201).json(teams)
  } catch (err) {
    next(err)
  }
}
export const getUsersNoActiveHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const teams = await getUsersNoActive()

    res.status(201).json(teams)
  } catch (err) {
    next(err)
  }
}

export const deleteUserHandler = async (
  req: Request<DeleteUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await findUserById(req.params.id)

    if (!user) {
      return next(new AppError(404, 'User with that ID not found'))
    }

    await deleteUserById(user.id)

    res.status(200).json({
      status: 'success',
      data: 'user deleted',
    })
  } catch (err) {
    next(err)
  }
}

export const updateUserHandler = async (
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await findUserById(req.params.id)

    if (!user) {
      return next(new AppError(404, 'Post with that ID not found'))
    }
    // if (req.body.username) {
    //   return next(new AppError(400, 'You can not change the team name'))
    // }
    const userRepository = AppDataSource.getRepository(User)
    const toSaveUser = userRepository.create({
      ...user,
      ...req.body,
    })

    await userRepository.manager.save(toSaveUser)

    res.status(200).json(toSaveUser)
  } catch (err) {
    next(err)
  }
}
