import { NextFunction, Request, Response } from 'express'

import { RoleEnumType, User } from '../entities/user.entity'
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema'
import {
  createUser,
  findUserByUserName,
  getLoggedUsers,
  signTokens,
  updateUserLogin,
} from '../services/user.service'
import AppError from '../utils/appError'
import { AuthUsers } from '../utils/authUsers'
import redisClient from '../utils/connectRedis'
import { AppDataSource } from '../utils/data-source'

export const registerUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password, email } = req.body

    const user = new User()
    user.username = username
    user.password = password
    user.email = email
    await AppDataSource.manager.save(user)

    res.status(201).json({
      status: 'success',
      message: 'user added successful',
    })
  } catch (err) {
    next(err)
  }
}
export const registerAdminHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password, email } = req.body

    const newUser = await createUser({
      username,
      email: email.toLowerCase(),
      password,
      role: RoleEnumType.ADMIN,
    })

    res.status(201).json({
      status: 'success',
      message: 'admin added successful',
    })
  } catch (err) {
    next(err)
  }
}
export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body
    const user = await findUserByUserName({ username })

    // 1. Check if user exist
    if (!user) {
      return next(new AppError(400, 'This user does not exist'))
    }
    if (!user || !(await User.comparePasswords(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'))
    }
    if (user && user.role === RoleEnumType.USER) {
    }
    await updateUserLogin(user.id, true)
    // 4. Sign Access and Refresh Tokens
    const { access_token } = await signTokens(user)

    // 6. Send response
    res.status(200).json({
      status: 'success',
      access_token,
    })
  } catch (err) {
    next(err)
  }
}
export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user
    console.log(user)
    await updateUserLogin(user.id, false)

    await redisClient.del(user.id)

    res.status(200).json({
      status: 'success',
    })
  } catch (err) {
    next(err)
  }
}
