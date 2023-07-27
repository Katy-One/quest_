import { array, boolean, object, string, TypeOf } from 'zod'

export const createGameSchema = object({
  body: object({
    gameName: string({
      required_error: 'Title is required',
    }),
  }),
})

const params = {
  params: object({
    id: string(),
  }),
}

const paramsDeleteTeam = {
  params: object({
    idGame: string(),
    idTeam: string(),
  }),
}

export const getGameSchema = object({
  ...params,
})

export const updateMessageSchema = object({
  ...params,
  body: object({
    finalMessage: string(),
  }).partial(),
})
export const updateStatusSchema = object({
  ...params,
  body: object({
    isActive: boolean(),
  }).partial(),
})
export const updateTeamSchema = object({
  ...params,
  body: object({
    id: string(),
  }).partial(),
})

export const deleteGameSchema = object({
  ...params,
})
export const deleteGameTeamSchema = object({
  ...paramsDeleteTeam,
})

export type CreateGameInput = TypeOf<typeof createGameSchema>['body']
export type GetGameInput = TypeOf<typeof getGameSchema>['params']
export type UpdateStatusInput = TypeOf<typeof updateStatusSchema>
export type UpdateMessageInput = TypeOf<typeof updateMessageSchema>
export type UpdateTeamInput = TypeOf<typeof updateTeamSchema>
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>['params']
export type DeleteGameTeamInput = TypeOf<typeof deleteGameTeamSchema>['params']
