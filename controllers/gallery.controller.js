import { request, response } from 'express';
import { PhotographerServices } from '../services/photographer.services.js';
import { galleryModel } from '../models/gallery.model.js';
import { ClientModel } from '../models/client.model.js';
import { galleryToObject } from '../helpers/galleryToObject.js';

export class GalleryContoller {


    static create = async (req = request, res = response) => {

        const photographerId = req.photographerId;

        const { title, client, photos, minPics, totalPrice } = req.body;

        try {

            const [photographer, clientInfo] = await Promise.all([
                PhotographerServices.findById(photographerId),
                ClientModel.findById(client),
            ])

            if (!clientInfo || !photographer) {
                throw Error('Este cliente o fotógrafo no existe en la base de datos');
            }

            const galleryData = {
                title,
                client,
                photos,
                minPics,
                totalPrice
            }

            const newGallery = await galleryModel.create(galleryData);
            newGallery.save();

            const gallery = galleryToObject(newGallery);

            res.status(201).json({
                ok: true,
                msg: 'Galería creada',
                gallery
            })

        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: "hubo un error al crear la galería"
            })
        }

    }

}