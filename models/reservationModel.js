import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true,
    },
    departureStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainStation',
        required: true,
    },
    arrivalStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainStation',
        required: true,
    },
    departureTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Reservation = mongoose.model('Reservation', reservationSchema);