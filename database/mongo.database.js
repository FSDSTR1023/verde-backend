import mongoose from "mongoose";

export const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: 'GreenGroup'
        });

        console.log("😎😎 db conectada 🔌");

    } catch (error) {

        console.log("😒😒" + error);

    }

}

