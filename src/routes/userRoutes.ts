import { Router } from "express"
import * as userController from '../controllers/userController'

const router = Router();

router.post('/', userController.createUser)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.post('/login', userController.getAllUser)

export default router;