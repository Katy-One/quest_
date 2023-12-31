import { object, string, TypeOf, z } from 'zod'
import { RoleEnumType } from '../entities/user.entity'

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  }),
})

export const loginUserSchema = object({
  body: object({
    username: string({
      required_error: 'username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
})
const params = {
  params: object({
    id: string(),
  }),
}

export const deleteUserSchema = object({
  ...params,
})
export const updateUserSchema = object({
  ...params,
  body: object({
    // email: string(),
    // password: string(),
    // motto: string(),
  }).partial(),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>['body']
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body']
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>['params']
export type UpdateUserInput = TypeOf<typeof updateUserSchema>
