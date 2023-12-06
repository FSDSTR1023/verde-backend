import bcrypt from "bcryptjs";
import { PhotographerModel } from "../models/photographer.model.js";
import { photographerToObject } from "../helpers/photographerToObject.js";


export const register = async (req, res) => {

    const { name, surname, email, password } = req.body;

    // Añadí una pequeña verificación para asegurarme de que el usuario ingresa todos los datos
    if (!name || !surname || !email || !password) {
        return res.status(400).json({
            ok: false,
            msg: 'Faltan datos. Debes ingresar: name, surname, email y password',
        });
    }

    try {

        const exitPhotographer = await PhotographerModel.findOne({ email });
        if (exitPhotographer) {
            return res.status(404).json({
                ok: false,
                msg: `El email: ${email} ya está registrado`
            });
        }

        // Antes de guardar la contraseña en la base de datos, voy a 'hashearla' por seguridad, en el endpoint del '/login' habrá que hacer la comparación de la siguiente manera: const isCorrectPassword = compareSync(contraseñaDesdeElFront, contraseñaEnBaseDeDatos) 
        const securePassword = bcrypt.hashSync(password);

        const photographer = await PhotographerModel.create({
            name,
            surname,
            email,
            password: securePassword
        });
        await photographer.save();

        // No quiero que la contraseña le llegue al front, por eso a través de desestructuración saco la contraseña y devuelvo lo demás (sin la contraseña) a través de la variable photographerResponse. He creado un helper para no escribir tanto, está la carpeta llamada helpers
        const photographerResponse = photographerToObject(photographer);

        res.status(201).json({
            ok: true,
            msg: 'Fotógrafo creado correctamente',
            photographer: [photographerResponse]
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error no controlado, notificar al administrador',
            error,
        })

    }
}



export const photographer = async (req, res) => {
    const { id } = req.params;
    console.log({ id });

    try {
        const getPhotographer = await PhotographerModel.findById(id);
        console.log('photographer found', getPhotographer);

        if (!getPhotographer) {
            return res.status(404).json({
                ok: false,
                msg: 'Fotógrafo no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Fotógrafo obtenido correctamente',
            photographer: getPhotographer 
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error no controlado, notificar al administrador',
            error: error.message 
        });
    }
};
