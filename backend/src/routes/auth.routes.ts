import express from 'express'
import {
  loginUserHandler,
  logoutHandler,
  registerAdminHandler,
  registerUserHandler,
} from '../controllers/auth.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { isAdmin } from '../middleware/isAdmin'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import { createUserSchema, loginUserSchema } from '../schemas/user.schema'

const router = express.Router()

router.post(
  '/create',
  deserializeUser,
  isAdmin,
  validate(createUserSchema),
  registerUserHandler,
)

// Register admin

router.post(
  '/create/admin',

  validate(createUserSchema),
  registerAdminHandler,
)
// Login user

router.post('/login', validate(loginUserSchema), loginUserHandler)

// Logout user

router.get('/logout', deserializeUser, requireUser, logoutHandler)

export default router
