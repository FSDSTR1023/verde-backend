import "dotenv/config";
import express from "express";
import { connectDB } from "./database/mongo.database.js";
import routerPhotographer from "./routes/photographer.route.js";
import cors from "cors";

await connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/photographer", routerPhotographer);

const PORT = process.env.PORT || 3000;

//? https://www.youtube.com/watch?v=MzDtfEBWMVI Esto es solo una curiosidad: si como puerto se pone el puerto 0, entonces lo que hace node es escuchar en un puerto random libre. Si queréis probarlo, comentad esta línea 👇 y descomentad la de más abajo.
app.listen(PORT, console.log(`👂 in http://localhost:${PORT}`));

/*
app.listen(0, function () {
    console.log(`👂 in http://localhost:${this.address().port}`)
});
*/
