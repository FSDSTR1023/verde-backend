import { Router } from 'express';
import { GalleryContoller } from '../controllers/gallery.controller.js';
import { checkJWT } from '../middlewares/checkJWT.middleware.js';

const routerGallery = Router();

routerGallery.post('/create', checkJWT, GalleryContoller.create);

routerGallery.get('/getAll', checkJWT, GalleryContoller.getAll);

routerGallery.get('/get/:id', checkJWT, GalleryContoller.getById);

// TODO: Hacer el get by Id para que el front mueste el OPENGALLERY

// routerClient.get('/:id',);

// routerClient.put('/:id',);

// routerClient.delete('/:id',);


export default routerGallery;
