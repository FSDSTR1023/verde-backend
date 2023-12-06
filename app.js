import "dotenv/config";
import express from "express";
import { connectDB } from "./database/mongo.database.js";
import router from "./routes/photographer.route.js";

await connectDB();

const app = express();

app.use(express.json());

app.use('/', router)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`👂 in http://localhost:${PORT}`));