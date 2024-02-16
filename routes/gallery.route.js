import { Router } from 'express';
import { GalleryContoller } from '../controllers/gallery.controller.js';
import { checkJWT } from '../middlewares/checkJWT.middleware.js';

const routerGallery = Router();

routerGallery.post('/create', checkJWT, GalleryContoller.create);

routerGallery.get('/getAll', checkJWT, GalleryContoller.getAll);

routerGallery.get('/get/:id', checkJWT, GalleryContoller.getById);

routerGallery.get('/get/client/:id', GalleryContoller.getByIdClient);

routerGallery.put('/delete/:id', checkJWT, GalleryContoller.deletePhotos);

routerGallery.put('/add/:id', checkJWT, GalleryContoller.addPhoto);

routerGallery.put('/edit/:id', checkJWT, GalleryContoller.editGallery);

routerGallery.delete('/delete', checkJWT, GalleryContoller.deleteGallery);

// routerClient.put('/:id',);

// routerClient.delete('/:id',);


export default routerGallery;
