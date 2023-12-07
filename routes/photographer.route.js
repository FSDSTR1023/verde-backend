import { Router } from "express";
import { Photographer } from "../controllers/photographer.controller.js";

const routerPhotographer = Router();

routerPhotographer.post('/register', Photographer.register);

routerPhotographer.post('/login', Photographer.login);

routerPhotographer.get('/:id', Photographer.getById);

routerPhotographer.put('/:id', Photographer.edit);

export default routerPhotographer;