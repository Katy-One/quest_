import http from 'http'
import { Server } from 'socket.io'
import { StatusEnumType } from '../entities/game.entity'
import { UserGame } from '../entities/user-game.entity'
import {
  findIsNotLoginUser,
  getFullGame,
  updateDataGame,
} from '../services/game.service'
import { CustomSocket, socketAuthMiddleware } from '../services/socket.service'
import { getTask } from '../services/task.service'
import { getUserGame, updateUserGameTask } from '../services/user-game.service'
import { getActiveUsers, updateUserActivity } from '../services/user.service'
import { AppDataSource } from '../utils/data-source'

interface SocketGameData {
  gameId: string
}

interface SocketTaskData extends SocketGameData {
  answer: string
  time: boolean
}
export const socketController = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.use(socketAuthMiddleware)

  const userGameTimers: any = {}

  io.on('connection', (socket: CustomSocket) => {
    socket.on('joinRoom', (roomId: string) => {
      socket.join(roomId)
    })

    socket.on('activeGame', async (data: SocketGameData) => {
      const game = await getFullGame(data.gameId)
      if (!game) {
        io.to(socket.id).emit('error', {
          message: 'Game with that ID not found',
        })
        return
      }

      const usersLogOut = await findIsNotLoginUser(data.gameId)
      if (usersLogOut) {
        io.to(socket.id).emit('error', {
          message: 'Not all users are logged in',
        })
        return
      }

      if (!game.isActive) {
        const activeUsers = await getActiveUsers()

        await updateDataGame(
          { isActive: true, status: StatusEnumType.ACTIVE },
          data.gameId,
        )
        for (const user of game.users) {
          await updateUserActivity(user.id, true)
        }

        for (const user of game.users) {
          const existingRecord = await AppDataSource.getRepository(
            UserGame,
          ).findOne({
            where: {
              game: { id: game.id },
              user: { id: user.id },
            },
          })

          if (!existingRecord) {
            const userGame = new UserGame()
            userGame.game = game
            userGame.user = user

            await userGame.save()
          }
        }

        io.to(game.id).emit('activeGame', {
          status: StatusEnumType.ACTIVE,
          isActive: true,
          gameId: data.gameId,
        })
      } else {
        if (game.isActive) {
          io.to(socket.id).emit('error', {
            message: 'The game have already activated',
          })
          return
        }
      }
    })

    socket.on('deactivateGame', async (data: SocketGameData) => {
      if (!socket.user) {
        return
      }
      const game = await getFullGame(data.gameId)
      if (!game) {
        io.to(socket.id).emit('error', {
          message: 'Game with that ID not found',
        })
        return
      }
      await updateDataGame({ isActive: false }, data.gameId)

      for (const user of game.users) {
        const userGame = await getUserGame({
          user: { id: user.id },
          game: { id: data.gameId },
        })
        if (!userGame) {
          io.to(socket.user.sub).emit('error', {
            message: 'task Game with that ID not found',
          })
          return
        }
        await updateUserGameTask(userGame.id, null)

        const userGameId = userGame.id
        let timeId = userGameTimers[userGameId]

        if (timeId) {
          clearTimeout(timeId)
          delete userGameTimers[userGameId]
        }
      }

      io.to(data.gameId).emit('deactivateGame', {
        isActive: false,
        gameId: data.gameId,
      })
    })
    socket.on('taskOne', async (data: SocketGameData) => {
      if (!socket.user) {
        return
      }
      const userGame = await getUserGame({
        user: { id: socket.user.sub },
        game: { id: data.gameId },
      })

      if (!userGame) {
        io.to(socket.id).emit('error', {
          message: 'Game with that ID not found',
        })
        return
      }

      io.to(socket.id).emit('task', {
        task: userGame?.task,
      })
    })
    socket.on('task', async (data: SocketTaskData) => {
      if (!socket.user) {
        return
      }
      const userGame = await getUserGame({
        user: { id: socket.user.sub },
        game: { id: data.gameId },
      })

      if (!userGame) {
        io.to(socket.user.sub).emit('error', {
          message: 'task Game with that ID not found',
        })
        return
      }

      const userGameId = userGame.id

      let timeId = userGameTimers[userGameId]

      if (timeId) {
        clearTimeout(timeId)
        delete userGameTimers[userGameId]
      }

      const delay = 10000

      userGameTimers[userGame.id] = timeId

      let socketId = socket.user.sub

      if (!userGame.task) {
        const task = userGame.game.tasks.find((task) => task.order === 1)

        if (task) {
          await updateUserGameTask(userGame.id, task)
        }
        const userGame2 = await getUserGame({
          user: { id: socket.user.sub },
          game: { id: data.gameId },
        })
        io.to(socketId).emit('task', {
          task: userGame2?.task,
        })
      } else {
        const task = await getTask(userGame.task.id)

        if (data.answer === task?.correctAnswer || data.time) {
          if (task) {
            let task2 = userGame.game.tasks.find(
              (taskItem) => taskItem.order === task.order + 1,
            )

            if (task2) {
              await updateUserGameTask(userGame.id, task2)
            } else {
              io.to(socketId).emit('task', {
                message: 'The game has been finished',
              })
              await updateUserGameTask(userGame.id, null)
              clearTimeout(timeId)
              delete userGameTimers[userGameId]
              return
            }
          }
          const userGame2 = await getUserGame({
            user: { id: socket.user.sub },
            game: { id: data.gameId },
          })
          io.to(socketId).emit('task', {
            task: userGame2?.task,
          })
        } else {
          io.to(socketId).emit('error', {
            message: 'Please try again',
          })
        }
      }

      timeId = setTimeout(async () => {
        if (!socket.user) {
          return
        }
        const userGame = await getUserGame({
          user: { id: socket.user.sub },
          game: { id: data.gameId },
        })

        if (userGame) {
          if (!userGame.task) {
            clearTimeout(timeId)
            delete userGameTimers[userGameId]
            return
          }
          if (userGameTimers[userGameId]) {
            io.to(socketId).emit('task', {
              time: true,
              gameId: userGame.game.id,
              answer: userGame.task.correctAnswer,
              task: userGame?.task,
              id: userGameId,
            })
          }
        }

        return
      }, delay)

      userGameTimers[userGameId] = timeId
    })
    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })
  })
}
