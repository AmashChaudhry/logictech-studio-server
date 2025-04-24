import mongoose from "mongoose";

export async function connectMongodb() {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log('Successfully connected to Database!');
        });
    } catch (error) {
        console.log(error.message);
    }
}