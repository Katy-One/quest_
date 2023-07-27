require('dotenv').config()
import bodyParser from 'body-parser'
import cluster from 'cluster'
import config from 'config'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import http from 'http'
import morgan from 'morgan'
import os from 'os'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../src/swagger/openapi.json'
import { socketController } from './controllers/socket.controller'
import authRouter from './routes/auth.routes'
import gameRouter from './routes/game.routes'
import userRouter from './routes/user.routes'
import AppError from './utils/appError'
import { AppDataSource } from './utils/data-source'
import validateEnv from './utils/validateEnv'

const numCpus = os.cpus().length

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv()
    const app = express()
    const server = http.createServer(app)

    socketController(server)

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.use(express.urlencoded({ extended: true }))

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    // 2. Logger
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

    // 4. Cors
    app.use(
      cors({
        origin: '*', // config.get<string>('origin'),
        credentials: true,
      }),
    )

    // ROUTES

    app.use('/users', authRouter)

    app.use('/users', userRouter)

    app.use('/games', gameRouter)
    app.get('/messages', async (req, res) => {
      try {
        console.log('message')
      } catch (err) {
        console.error('Error fetching messages:', err)
        res.status(500).json({ error: 'Internal server error' })
      }
    })
    // UNHANDLED ROUTE
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`))
    })

    // GLOBAL ERROR HANDLER
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || 'error'
        error.statusCode = error.statusCode || 500
        console.log(error)
        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        })
      },
    )

    const port = config.get<number>('port')
    if (cluster.isPrimary) {
      for (let i = 0; i < numCpus; i++) {
        cluster.fork()
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker pid: ${worker.process.pid} died`)
        cluster.fork()
      })
    } else {
      server.listen(port)
      console.log(`Server started with pid: ${process.pid} on port: ${port}`)
    }
  })
  .catch((error) => console.log(error))
