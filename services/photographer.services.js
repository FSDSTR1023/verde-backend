import { photographerToObject } from "../helpers/photographerToObject.js";
import { PhotographerModel } from "../models/photographer.model.js";

export class PhotographerServices {

  static async findById(id) {

    try {

      const photographer = await PhotographerModel.findById(id);

      if (!photographer) {
        throw Error('Este usuario no existe en la base de datos');
      }

      const photographerObject = photographerToObject(photographer);

      return photographerObject;

    } catch (e) {

      console.log("🙀 Error: ", e);

    }

  }
}
