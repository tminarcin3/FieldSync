import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get("/v1/users", userController.getUsers);
router.post("/v1/users", userController.createUser);

export default router;