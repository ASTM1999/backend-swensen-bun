import { Router } from "express"
import * as userController from '../controllers/userController'
import { validateUser } from "../middleware/validate";
import { sanitizeUser } from "../middleware/sanitizeInput";
import { authenticateJWT } from "../middleware/authenticateJWT";
import { decryptInput } from "../middleware/decryption";
import loginLimiter from "../middleware/loginLiniter";


const router = Router();

router.post('/', decryptInput, sanitizeUser, validateUser, userController.createUser);
router.post('/login', loginLimiter, decryptInput, userController.loginUser);
router.get('/', authenticateJWT, userController.getAllUser);
router.get('/:id', authenticateJWT, userController.getUserById);
router.put('/:id', sanitizeUser, validateUser, authenticateJWT, userController.updateUser);
router.delete('/:id', authenticateJWT, userController.deleteUser);

export default router;