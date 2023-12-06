import { Router } from "express";
import { register } from "../controllers/photographer.controller.js";
import { photographer } from "../controllers/photographer.controller.js";

const router = Router();

router.post('/register', register)

router.get('/photographer/:id', photographer)

export default router;