import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// const USERNAME = process.env.DB

const Connection = () => {
    // const MONGODB_URI = process.env.MONGODB_URI;
    const MONGODB_URI = 'mongodb://localhost:27017';
    mongoose.connect(MONGODB_URI,{useNewUrlParser:true});
    mongoose.connection.on('connected',()=>{
        console.log("Database connected successfully");
    });

    mongoose.connection.on('disconnected',()=>{
        console.log("database disconnedted");
    });

    mongoose.connection.on('error',()=>{
        console.log("Error while connecting database",error.message);
    });
}

export default Connection;