import express from 'express';
import userService from '../services/userService';

const router = express.Router();

router.get("/v1/download", userService.downloadUsers);

export default router;