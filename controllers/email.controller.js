import { request, response } from 'express'
import sgMail from '@sendgrid/mail'

export class Email {

    static sender = (req = request, res = response) => {

        const { email, link } = req.body

        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        // javascript

        // instalar paquete: npm install --save @sendgrid/mail

        // const sgMail = require('@sendgrid/mail')

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: email, // Change to your recipient
            from: 'appmygallery@gmail.com', // Change to your verified sender
            subject: '¡Ya estás listas tus fotos!',
            html: `¡Hola! Aquí tienes el enlace donde podrás seleccionar y descargar tus fotos: <a href=${link} target="_blank" rel="noopener noreferrer">${link}</a>
            <br>
            ¡Que las disfrutes!

            Gracias por contar con <a href="https://piclery.netlify.app" target="_blank">Piclery</a>.
            `,
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
                res.status(400).json({
                    ok: false,
                    msg: "Algo falló en el envío. Revisa el correo de destino",
                    error
                })
            })

        const data = req.body;

        res.status(200).json({
            ok: true,
            msg: "Email enviado correctamente",
            data
        })
    }

}