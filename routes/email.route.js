import { Router } from "express";
import { checkJWT } from "../middlewares/checkJWT.middleware.js";
import { Email } from '../controllers/email.controller.js';

const routerEmail = Router();

routerEmail.post('/sender', checkJWT, Email.sender);

export default routerEmail;
