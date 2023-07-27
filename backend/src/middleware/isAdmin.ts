import { NextFunction, Request, Response } from 'express'
import { RoleEnumType } from '../entities/user.entity'
import AppError from '../utils/appError'

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (res.locals.user.role && res.locals.user.role === RoleEnumType.ADMIN) {
      next()
    } else {
      return next(new AppError(401, 'You are not admin'))
    }
  } catch (err) {
    next(err)
  }
}
