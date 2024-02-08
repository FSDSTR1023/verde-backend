import { Router } from 'express';
import { GalleryContoller } from '../controllers/gallery.controller.js';
import { checkJWT } from '../middlewares/checkJWT.middleware.js';

const routerGallery = Router();

routerGallery.post('/create', checkJWT, GalleryContoller.create);

routerGallery.get('/getAll', checkJWT, GalleryContoller.getAll);

// routerClient.get('/:id',);

// routerClient.put('/:id',);

// routerClient.delete('/:id',);


export default routerGallery;
