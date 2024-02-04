import { Router } from "express";
import { Client } from '../controllers/client.controller.js';
import { checkJWT } from "../middlewares/checkJWT.middleware.js";

const routerClient = Router();

routerClient.post('/register', checkJWT, Client.register);

// routerClient.post('/login',);

// routerClient.get('/:id',);

// routerClient.put('/:id',);

// routerClient.delete('/:id',);


export default routerClient;
