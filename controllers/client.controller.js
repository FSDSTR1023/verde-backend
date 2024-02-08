import { request, response } from "express";
import { ClientModel } from "../models/client.model.js";
import { clientToObject } from "../helpers/clientToObject.js";
import { PhotographerModel } from "../models/photographer.model.js";
import { request, response } from "express";
import { ClientModel } from "../models/client.model.js";
import { clientToObject } from "../helpers/clientToObject.js";
import { PhotographerModel } from "../models/photographer.model.js";
import { photographerToObject } from "../helpers/photographerToObject.js";

export class Client {
  static register = async (req = request, res = response) => {
    const photographerId = req.photographerId;

    const { name, surname, email, phone } = req.body;

    if (!name || !surname || !email || !phone) {
      res.status(400).json({
        ok: false,
        msg: "Es necesario el name, surname, email y phone para crear un cliente",
      });
    }

    try {
      const clientCreated = await ClientModel.create(req.body);
      await clientCreated.save();

      const clientResponse = clientToObject(clientCreated);

      PhotographerModel.findByIdAndUpdate(photographerId, {
        $push: { clients: clientResponse.id },
      });

      res.status(201).json({
        ok: true,
        msg: "Cliente creado con éxito",
        clientResponse,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "no se pudo crear el cliente",
        error: error.message,
      });
    }
  };

  static getAll = async (req = request, res = response) => {
    const photographerId = req.photographerId;

    try {
      const photographer = await PhotographerModel.findById(photographerId)
        .populate("clients", ["email", "name"])
        .exec();

      const photographerResponse = photographerToObject(photographer);

      res.status(201).json({
        ok: true,
        msg: "Tus clientes son:",
        photographerResponse,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "algo salió mal",
        error: error.message,
      });
    }
  };

  // TODO:
  // static getById
  // static edit
  // static delete
}
