import usersController from '../controllers/users.controller.ts'
import { Router } from 'express'

const router: Router = Router()

router.post('/register', usersController.register)
router.post('/login', usersController.login)

export default router
