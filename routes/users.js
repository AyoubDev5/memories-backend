import express from 'express'
import { login,register } from '../controllers/users.js';
const router = express.Router();

router.post('/signIn', login)
router.post('/signUp', register)

export default router;
