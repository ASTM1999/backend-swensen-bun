import { Router } from "express"
import * as userController from '../controllers/userController'
import { validateUser } from "../middleware/validate";

const router = Router();

router.post('/', validateUser, userController.createUser)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.put('/:id', validateUser, userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.post('/login', userController.loginUser)

export default router;