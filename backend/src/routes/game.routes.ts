import express from 'express'
import {
  createGameHandler,
  deleteGameHandler,
  deleteTeamGameHandler,
  getGameHandler,
  getGamesHandler,
  getGameWithNoneActiveUsersHandler,
  updateMessageHandler,
  updateStatusHandler,
  updateTeamHandler,
} from '../controllers/game.controller'
import {
  createTaskHandler,
  deleteTaskHandler,
  updateTaskHandler,
} from '../controllers/task.controller'

import { deserializeUser } from '../middleware/deserializeUser'
import { isAdmin } from '../middleware/isAdmin'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import { createGameSchema, deleteGameSchema } from '../schemas/game.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)

// Get currently logged in user

router.get('/', getGamesHandler)
router.get('/users/disable/game/:id', getGameWithNoneActiveUsersHandler)

router.get('/:id', isAdmin, getGameHandler)

router.put('/update/status/:id', isAdmin, updateStatusHandler)

router.put('/update/teams/:id', isAdmin, updateTeamHandler)

router.put('/update/message/:id', isAdmin, updateMessageHandler)

router.post('/create', isAdmin, validate(createGameSchema), createGameHandler)

router.post('/task/create/', isAdmin, createTaskHandler)

router.delete('/task/delete/:id', isAdmin, deleteTaskHandler)

router.delete('/team/delete/:idGame/:idTeam', isAdmin, deleteTeamGameHandler)

router.put('/update/task/:id', isAdmin, updateTaskHandler)

router.delete(
  '/delete/:id',
  isAdmin,
  validate(deleteGameSchema),
  deleteGameHandler,
)

export default router
