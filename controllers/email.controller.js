import { request, response } from 'express'
import sgMail from '@sendgrid/mail'

export class Email {

    static sender = (req = request, res = response) => {

        const { email, link } = req.body

        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        // javascript

        // piclery: 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

        // instalar paquete: npm install --save @sendgrid/mail

        // const sgMail = require('@sendgrid/mail')

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: email, // Change to your recipient
            from: 'appmygallery@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            html: `Haz click <a href="${link}" target="_blank" rel="noopener noreferrer">aquí</a> para ver tu galería y comprar 🤑 tus fotos`,
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        const data = req.body;

        res.status(200).json({
            ok: true,
            msg: "todo bien",
            data
        })
    }

}