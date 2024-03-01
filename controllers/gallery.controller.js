import { request, response } from "express";
import { PhotographerServices } from "../services/photographer.services.js";
import { galleryModel } from "../models/gallery.model.js";
import { ClientModel } from "../models/client.model.js";
import { galleryToObject } from "../helpers/galleryToObject.js";
import { PhotographerModel } from "../models/photographer.model.js";
import { photographerToObject } from "../helpers/photographerToObject.js";
import { clientToObject } from "../helpers/clientToObject.js";

export class GalleryContoller {
  static create = async (req = request, res = response) => {
    const photographerId = req.photographerId;

    const { title, client, photos, minPics, totalPrice, singlePrice } =
      req.body;

    try {
      const [photographer, clientInfo] = await Promise.all([
        PhotographerServices.findById(photographerId),
        ClientModel.findById(client),
      ]);

      if (!clientInfo || !photographer) {
        throw Error("Este cliente o fotógrafo no existe en la base de datos");
      }

      const galleryData = {
        title,
        client,
        photos,
        minPics,
        totalPrice,
        singlePrice,
      };

      const newGallery = await galleryModel.create(galleryData);
      newGallery.save();

      const galleryObject = galleryToObject(newGallery);

      await Promise.all([
        PhotographerModel.findByIdAndUpdate(photographerId, {
          $push: { gallery: galleryObject.id },
        }),
        // ClientModel.findByIdAndUpdate(clientInfo.id, {
        //     $push: { gallery: galleryObject.id }
        // }),
      ]);

      res.status(201).json({
        ok: true,
        msg: "Galería creada",
        gallery: galleryObject,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "hubo un error al crear la galería",
        error,
      });
    }
  };

  static addPhoto = async (req = request, res = response) => {
    const id = req.params.id;
    const { photos } = req.body;

    try {
      const newGallery = await galleryModel.findByIdAndUpdate(id, {
        $push: { photos },
      });

      const galleryResponse = galleryToObject(newGallery);

      res.status(200).json({
        ok: true,
        msg: `Galería con id: ${id}`,
        gallery: galleryResponse,
      });
    } catch (error) {
      console.trace(error);

      res.status(400).json({
        ok: false,
        msg: "Algo salió mal",
        error,
      });
    }
  };

  static editGallery = async (req = request, res = response) => {
    const id = req.params.id;
    const data = req.body;

    try {
      const newGallery = await galleryModel.findByIdAndUpdate(id, data);

      const galleryResponse = galleryToObject(newGallery);

      res.status(200).json({
        ok: true,
        msg: `Galería con id: ${id} editada`,
        gallery: galleryResponse,
      });
    } catch (error) {
      console.trace(error);

      res.status(400).json({
        ok: false,
        msg: "Algo salió mal",
        error,
      });
    }
  };

  static getAll = async (req = request, res = response) => {
    const photographerId = req.photographerId;

    try {
      const photographer = await PhotographerModel.findById(photographerId)
        .populate("gallery")
        .exec();
      const photograperResponse = photographerToObject(photographer);

      res.status(200).json({
        ok: true,
        msg: "Tus galerías son",
        galeries: photograperResponse.gallery,
      });
    } catch (error) {
      console.trace(error);

      res.status(400).json({
        ok: true,
        msg: "Algo salió mal",
        error,
      });
    }
  };

  static getById = async (req = request, res = response) => {
    const id = req.params.id;

    if (!id) {
      res.status(404).json({
        ok: true,
        msg: "No se ha proporcionado el ID de la galería",
      });
    }

    try {
      const gallery = await galleryModel.findById(id).populate("client").exec();

      const galleryResponse = galleryToObject(gallery);

      res.status(200).json({
        ok: true,
        msg: `Galería con id: ${id}`,
        gallery: galleryResponse,
      });
    } catch (error) {
      console.trace(error);

      res.status(400).json({
        ok: false,
        msg: "Algo salió mal",
        error: error.message,
      });
    }
  };

  static getByIdClient = async (req = request, res = response) => {
    const id = req.params.id;

    if (!id) {
      res.status(404).json({
        ok: true,
        msg: "No se ha proporcionado el ID de la galería",
      });
    }

    try {
      const gallery = await galleryModel.find({ client: id });

      const galleryResponse = galleryToObject(gallery);

      res.status(200).json({
        ok: true,
        msg: `Galerías del cliente: ${id}`,
        galleries: galleryResponse,
      });
    } catch (error) {
      console.trace(error);

      res.status(400).json({
        ok: false,
        msg: "Algo salió mal",
        error,
      });
    }
  };

  static deletePhotos = async (req = request, res = response) => {
    const id = req.params.id;
    const { newGal } = req.body;

    try {
      const newGallery = await galleryModel.findByIdAndUpdate(id, {
        photos: newGal,
      });

      const galleryResponse = galleryToObject(newGallery);

      res.status(200).json({
        ok: true,
        msg: `Galería con id: ${id}`,
        gallery: galleryResponse,
      });
    } catch (error) {
      console.trace(error);

      res.status(400).json({
        ok: false,
        msg: "Algo salió mal",
        error,
      });
    }
  };
  static deleteGallery = async (req = request, res = response) => {
    const photographerId = req.photographerId;

    const { ids } = req.body;

    const promises = [];

    try {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];

        const promise = galleryModel.findByIdAndDelete(id);

        promises.push(promise);
      }

      await Promise.all([
        ...promises,
        PhotographerModel.findByIdAndUpdate(photographerId, {
          $pull: { gallery: { $in: ids } },
        }),
      ]);

      res.status(200).json({
        ok: true,
        msg: `Galerías eliminadas`,
      });
    } catch (error) {
      console.trace(error);

      res.status(400).json({
        ok: false,
        msg: "Algo salió mal",
        error,
      });
    }
  };
}
