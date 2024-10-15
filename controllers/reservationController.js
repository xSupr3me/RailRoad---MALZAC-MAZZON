import { Reservation } from '../models/reservationModel.js';
import { Train } from '../models/trainModel.js';
import { Trainstation } from '../models/trainstationModel.js';

export const createReservation = async (req, res) => {
    try {
        const { train, departureStation, arrivalStation, departureTime } = req.body;

        const trainExists = await Train.findById(train);
        const departureExists = await Trainstation.findById(departureStation);
        const arrivalExists = await Trainstation.findById(arrivalStation);

        if (!trainExists || !departureExists || !arrivalExists) {
            return res.status(400).json({ message: "Invalid train or station data." });
        }

        const reservation = new Reservation({
            user: req.user._id,
            train,
            departureStation,
            arrivalStation,
            departureTime,
        });

        await reservation.save();
        res.status(201).json({ message: "Reservation created successfully.", reservation });
    } catch (error) {
        res.status(500).json({ message: "Error creating reservation." });
    }
};

export const getUserReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id })
            .populate('train departureStation arrivalStation');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reservations." });
    }
};

export const cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found." });
        }

        if (reservation.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "You are not allowed to cancel this reservation." });
        }

        reservation.status = 'cancelled';
        await reservation.save();
        res.status(200).json({ message: "Reservation cancelled successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling reservation." });
    }
};
