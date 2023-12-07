import bcrypt from "bcryptjs";
import { PhotographerModel } from "../models/photographer.model.js";
import { photographerToObject } from "../helpers/photographerToObject.js";

export class Photographer {


    static register = async (req, res) => {

        const { name, surname, email, password } = req.body;

        // Añadí una pequeña verificación para asegurarme de que el usuario ingresa todos los datos
        if (!name || !surname || !email || !password) {
            return res.status(400).json({
                ok: false,
                msg: 'Faltan datos. Debes ingresar: name, surname, email y password',
            });
        }

        try {

            const existPhotographer = await PhotographerModel.findOne({ email });
            if (existPhotographer) {
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

<<<<<<< HEAD
            console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error no controlado, notificar al administrador',
            error,
        });
    }
};

    static getById = async (req, res) => {
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

        // FIXME: Hola, Maribel. ¿Qué te parece si antes de devolverle la información al usuario, hacemos: const getPhotographerResponse = photographerToObject(getPhotographer); así no les llega el __v ni la contraseña?
        const getPhotographerResponse = photographerToObject(getPhotographer);
        res.status(200).json({
            ok: true,
            msg: 'Fotógrafo obtenido correctamente',
            photographer:[getPhotographerResponse]
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

    static edit = async (req, res) => {

        const { id } = req.params;
        //? para editar el password, necesitaremos validaciones extra, verdad?
        const { name, surname, email, /* password */ } = req.body;


        try {
            const [existId, existEmail] = await Promise.all([
                PhotographerModel.findById(id),
                PhotographerModel.findOne({ email }),
            ])

            if (!existId) {
                return res.status(404).json({
                    ok: false,
                    msg: `El id: ${id} no existe`
                });
            }

            if (existEmail && existId.email !== email) {
                return res.status(404).json({
                    ok: false,
                    msg: `El email: ${email} ya está registrado`
                });
            }

            const putPhotographer = await PhotographerModel.findByIdAndUpdate(id, { name, surname, email }, { new: true });

            const putPhotographerResponse = photographerToObject(putPhotographer);

            res.status(200).json({
                ok: true,
                msg: `Fotógrafo con id: ${id}, fue editado`,
                photographer: [putPhotographerResponse]
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

}