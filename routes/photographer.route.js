import { Router } from "express";
import { edit, register, photographer } from "../controllers/photographer.controller.js";

const router = Router();

router.post('/register', register);

router.get('/photographer/:id', photographer);

router.put('/photographer/:id', edit);

export default router;