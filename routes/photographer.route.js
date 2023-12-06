import { Router } from "express";
import { register } from "../controllers/photographer.controller.js";

const router = Router();

router.post('/register', register)

export default router;