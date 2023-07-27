import express from 'express'

import {
  deleteUserHandler,
  getMeHandler,
  getUsersHandler,
  getUsersNoActiveHandler,
  updateUserHandler,
} from '../controllers/user.controller'

import { deserializeUser } from '../middleware/deserializeUser'
import { isAdmin } from '../middleware/isAdmin'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import { deleteUserSchema, updateUserSchema } from '../schemas/user.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)

// Get currently logged in user
router.get('/current', getMeHandler)

router.get('/teams', isAdmin, getUsersHandler)
router.get('/teams/noActive', getUsersNoActiveHandler)
router.delete(
  '/delete/:id',
  isAdmin,
  validate(deleteUserSchema),
  deleteUserHandler,
)
router.put(
  '/update/:id',
  isAdmin,
  validate(updateUserSchema),
  updateUserHandler,
)
export default router
