import { array, boolean, number, object, string, TypeOf } from 'zod'

const taskInput = {
  taskName: string({
    required_error: 'taskName is required',
  }),
  answerFormat: string({
    required_error: ' answerFormat is required',
  }),
  description: string({
    required_error: ' description is required',
  }),
  correctAnswer: string({
    required_error: ' answerFormat is required',
  }),
  order: number({
    required_error: ' orderFormat is required',
  }),
}

export const createTaskSchema = object({
  body: object(taskInput),
})

const params = {
  params: object({
    id: string(),
  }),
}

export const getTaskSchema = object({
  ...params,
})

export const updateTaskSchema = object({
  ...params,
  body: object({
    ...taskInput,
    gameId: string({
      required_error: 'GameId is required',
    }),
    hints: object({
      id: string(),
      hintDescription: string(),
      timeAppear: string(),
    }).array(),
  }).partial(),
})

export const deleteTaskSchema = object({
  ...params,
})

export type CreateTaskInput = TypeOf<typeof createTaskSchema>['body']
export type GetTaskInput = TypeOf<typeof getTaskSchema>['params']
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>['params']
