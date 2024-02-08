import "dotenv/config";
import express, { application } from "express";
import { connectDB } from "./database/mongo.database.js";
import routerPhotographer from "./routes/photographer.route.js";
import cors from "cors";
import morgan from 'morgan';
import routerClient from './routes/client.route.js';
import { checkJWT } from "./middlewares/checkJWT.middleware.js";
import routerGallery from './routes/gallery.route.js';

await connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.use("/photographer", routerPhotographer);
app.use("/client", routerClient);
app.use("/gallery", routerGallery);

const PORT = process.env.PORT || 3000;

//? https://www.youtube.com/watch?v=MzDtfEBWMVI Esto es solo una curiosidad: si como puerto se pone el puerto 0, entonces lo que hace node es escuchar en un puerto random libre. Si queréis probarlo, comentad esta línea 👇 y descomentad la de más abajo.
app.listen(PORT, console.log(`👂 in http://localhost:${PORT}`));

/*
app.listen(0, function () {
    console.log(`👂 in http://localhost:${this.address().port}`)
});
*/
