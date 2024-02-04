import { request, response } from "express";
import { validateJWT } from "../helpers/JWT.helper.js";

export const checkJWT = async (req = request, res = response, next) => {
  const auth = req.headers?.authorization;

  if (!auth) {
    return res.status(401).json({
      ok: false,
      msg: 'No se encontró token. No estás autorizado.',
    });
  }

  try {
    const { id } = validateJWT(auth);

    req.photographerId = id;

    next();
  } catch (e) {
    res.status(401).json({
      ok: false,
      msg: e.message
    })
  }

}
