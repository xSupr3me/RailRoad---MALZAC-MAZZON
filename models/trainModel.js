import mongoose from "mongoose";

//Schéma des trains
//id, name, start_station, end_station, time_of_departure}

const trainSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    start_station : {
        type : String,
        required : true,
    },
    end_station : {
        type : String,
        required : true,
    },
    time_of_departure : {
        type : Date,
        required : true,
    },
    time_of_arrival : {
        type : Date,
        required : true,
    }
});

export const Train = mongoose.model("train", trainSchema);