import { Router } from "express";
import { Client } from '../controllers/client.controller.js';
import { checkJWT } from "../middlewares/checkJWT.middleware.js";

const routerClient = Router();

routerClient.post('/register', checkJWT, Client.register);

routerClient.get('/getAll', checkJWT, Client.getAll);

routerClient.get('/:id', checkJWT, Client.getById);

routerClient.put('/:id', checkJWT, Client.edit);

routerClient.delete('/:id', checkJWT, Client.delete);

export default routerClient;
