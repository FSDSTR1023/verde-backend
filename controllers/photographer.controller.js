import bcrypt from "bcryptjs";
import { PhotographerModel } from "../models/photographer.model.js";
import { photographerToObject } from "../helpers/photographerToObject.js";
import { newJWT, valitateJWT } from "../helpers/JWT.helper.js";

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

            // Antes de guardar la contraseña en la base de datos, voy a 'hashearla' por seguridad, en el endpoint del '/login' habrá que hacer la comparación de la siguiente manera: const isCorrectPassword = bcrypt.compareSync(contraseñaDesdeElFront, contraseñaEnBaseDeDatos) 
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

            const token = newJWT({ id: photographerResponse.id })

            res.status(201).json({
                ok: true,
                msg: 'Fotógrafo creado correctamente',
                photographer: [photographerResponse],
                token
            })

        } catch (error) {

            console.log(error);

            res.status(500).json({
                ok: false,
                msg: 'Error no controlado, notificar al administrador',
                error,
            });
        }
    };

    static login = async (req, res) => {

        const { email, password } = req.body;

        // Añadí una pequeña verificación para asegurarme de que el usuario ingresa email y password correctos
        if (!email || !password) {
            return res.status(401).json({
                ok: false,
                msg: 'email o password no correcto',
            });
        }

        try {

            const existPhotographer = await PhotographerModel.findOne({ email });
            if (!existPhotographer) {
                return res.status(404).json({
                    ok: false,
                    msg: `email o password no correcto`
                });
            }

            // Antes de guardar la contraseña en la base de datos, voy a 'hashearla' por seguridad, en el endpoint del '/login' habrá que hacer la comparación de la siguiente manera: const isCorrectPassword = bcrypt.compareSync(contraseñaDesdeElFront, contraseñaEnBaseDeDatos) 
            const isCorrectPassword = bcrypt.compareSync(password, existPhotographer.password);

            if (!isCorrectPassword) {
                return res.status(401).json({
                    ok: false,
                    msg: 'email o password no correcto',
                });
            }


            // No quiero que la contraseña le llegue al front, por eso a través de desestructuración saco la contraseña y devuelvo lo demás (sin la contraseña) a través de la variable photographerResponse. He creado un helper para no escribir tanto, está la carpeta llamada helpers
            const photographerResponse = photographerToObject(existPhotographer);

            const token = newJWT(photographerResponse);

            res.status(201).json({
                ok: true,
                msg: 'contraseña y usuario correctos',
                photographer: [photographerResponse],
                token
            })

        } catch (error) {

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

            const getPhotographerResponse = photographerToObject(getPhotographer);
            res.status(200).json({
                ok: true,
                msg: 'Fotógrafo obtenido correctamente',
                photographer: [getPhotographerResponse]
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
        const { name, surname, email, /* password */ } = req.body; //! Brayan no necesita esto

        if (!auth) {
            return res.status(401).json({
                ok: false,
                msg: 'No se encontró token. No estás autorizado.',
            });
        }

        const { id: tokenId } = valitateJWT(auth)

        if (id !== tokenId) { // TODO: Añadir validación de role
            return res.status(401).json({
                ok: false,
                msg: 'No puedes editar los datos de otro usuario',
            });
        }

        try {
            const [existId, existEmail] = await Promise.all([
                PhotographerModel.findById(id),
                PhotographerModel.findOne({ email }),//! Brayan no necesita esto
            ])

            if (!existId) {
                return res.status(404).json({
                    ok: false,
                    msg: `El id: ${id} no existe`
                });
            }

            if (existEmail && existId.email !== email) {//! Brayan no necesita esto
                return res.status(404).json({//! Brayan no necesita esto
                    ok: false,//! Brayan no necesita esto
                    msg: `El email: ${email} ya está registrado`//! Brayan no necesita esto
                });//! Brayan no necesita esto
            }//! Brayan no necesita esto


            // const putPhotographer = await PhotographerModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            const putPhotographer = await PhotographerModel.findByIdAndUpdate(id, { name, surname, email }, { new: true }); //! necesitas solo la línea de arriba

            const putPhotographerResponse = photographerToObject(putPhotographer);

            res.status(200).json({
                ok: true,
                msg: `Fotógrafo con id: ${id}, fue editado`, //! brayan tiene que cambiar este mensaje
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

    
    static delete = async (req, res) => {
        
        const { id } = req.params;
        //? para editar el password, necesitaremos validaciones extra, verdad?
        
        const auth = req.headers?.authorization;
        
        try {
        if (!auth) {
            return res.status(401).json({
                ok: false,
                msg: 'No se encontró token. No estás autorizado.',
            });
        }

        const { id: tokenId } = valitateJWT(auth)
        
    if (id !== tokenId) { // TODO: Añadir validación de role
        return res.status(401).json({
            ok: false,
            msg: 'No puedes eliminar los datos de otro usuario',
        });
    }

        const existId = await PhotographerModel.findById(id);
            
            
        
        
        if (!existId) {
            return res.status(404).json({
                ok: false,
                msg: `El id: ${id} no existe`
            });
        }
        
        
        const putPhotographer = await PhotographerModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }); 
        const putPhotographerResponse = photographerToObject(putPhotographer);
        
        
        res.status(200).json({
            ok: true,
            msg: `Fotógrafo con id: ${id}, fue eliminado`, 
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