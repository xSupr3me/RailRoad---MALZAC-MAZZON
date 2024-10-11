import mongoose from "mongoose";

//Schéma des Trainstations
//id, name, open_hour, close_hour, image

const trainstationSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    open_hour : {
        type : String,
        required : true,
    },
    close_hour : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    }
});


export const Trainstation = mongoose.model("trainstation", trainstationSchema);