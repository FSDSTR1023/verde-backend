import { PhotographerModel } from "../models/photographer.model.js";


export const register = async (req, res) => {

    const { name, surname, email, password } = req.body;

    console.log({ name });
    console.log({ surname });
    console.log({ email });
    console.log({ password });

    try {

        const exitPhotographer = await PhotographerModel.findOne({ email });

        if (exitPhotographer) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ya exite'
            })
        }

        const photographer = new PhotographerModel({
            name,
            surname,
            email,
            password
        });

        await photographer.save();

        res.status(201).json({
            ok: true,
            msg: 'Fotógrafo creado correctamente',
            photographer: [photographer]
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error no controlado, notificar al administrador',
            error
        })

    }
}