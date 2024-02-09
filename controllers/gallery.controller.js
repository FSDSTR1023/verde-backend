import { request, response } from 'express';
import { PhotographerServices } from '../services/photographer.services.js';
import { galleryModel } from '../models/gallery.model.js';
import { ClientModel } from '../models/client.model.js';
import { galleryToObject } from '../helpers/galleryToObject.js';
import { PhotographerModel } from '../models/photographer.model.js';
import { photographerToObject } from '../helpers/photographerToObject.js';

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

            const galleryObject = galleryToObject(newGallery);

            await Promise.all([
                PhotographerModel.findByIdAndUpdate(photographerId, {
                    $push: { gallery: galleryObject.id }
                }),
                ClientModel.findByIdAndUpdate(clientInfo.id, {
                    $push: { gallery: galleryObject.id }
                }),
            ]);

            res.status(201).json({
                ok: true,
                msg: 'Galería creada',
                gallery: galleryObject
            })

        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: "hubo un error al crear la galería"
            })
        }

    }

    static getAll = async (req = request, res = response) => {

        const photographerId = req.photographerId;

        try {

            const photographer = await PhotographerModel.findById(photographerId).populate('gallery').exec();
            const photograperResponse = photographerToObject(photographer);

            res.status(200).json({
                ok: true,
                msg: 'Tus galerías son',
                galeries: photograperResponse.gallery
            })



        } catch (error) {

            console.trace(error);

            res.status(400).json({
                ok: true,
                msg: 'Algo salió mal',
                error
            });
        }

    }


    static getById = async (req = request, res = response) => {

        const id = req.params.id

        if (!id) {
            res.status(404).json({
                ok: true,
                msg: 'No se ha proporcionado el ID de la galería',
            })

        }

        try {

            const gallery = await galleryModel.findById(id).populate('client').exec();

            console.log(gallery);

            const galleryResponse = galleryToObject(gallery);

            res.status(200).json({
                ok: true,
                msg: `Galería con id: ${id}`,
                gallery: galleryResponse
            })



        } catch (error) {

            console.trace(error);

            res.status(400).json({
                ok: true,
                msg: 'Algo salió mal',
                error
            });
        }

    }

}