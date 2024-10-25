import { Reservation } from '../models/reservationModel.js';
import { Train } from '../models/trainModel.js';
import mongoose from 'mongoose';

export const createReservation = async (req, res) => {
    try {
        const { train } = req.body;

        const trainExists = await Train.findById(train);
        if (!trainExists) {
            return res.status(400).json({ message: "Invalid train ID." });
        }

        const reservation = new Reservation({
            user: req.user._id,
            train: trainExists._id,
            departureStation: trainExists.start_station,
            arrivalStation: trainExists.end_station,
            departureTime: trainExists.time_of_departure,
        });

        await reservation.save();
        res.status(201).json({ message: "Reservation created successfully.", reservation });
    } catch (error) {
        console.error("Error in createReservation:", error);
        res.status(500).json({ message: "Error creating reservation. Please check input data and try again." });
    }
};

export const getUserReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id });

        if (!reservations.length) {
            return res.status(404).json({ message: "No reservations found for this user." });
        }

        res.status(200).json({ message: "Reservations retrieved successfully.", reservations });
    } catch (error) {
        console.error("Error retrieving user reservations:", error);
        res.status(500).json({ message: "Error retrieving user reservations. Please try again later." });
    }
};

export const cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found." });
        }
        reservation.status = 'cancelled';
        await reservation.save();
        res.status(200).json({ message: "Reservation cancelled successfully." });
    } catch (error) {
        console.error("Error cancelling reservation:", error);
        res.status(500).json({ message: "Error cancelling reservation. Please try again later." });
    }
};

export const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findOneAndDelete({ _id: id, user: req.user._id });

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found or you do not have permission to delete this reservation." });
        }

        res.status(200).json({ message: "Reservation deleted successfully." });
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ message: "Error deleting reservation. Please try again later." });
    }
};

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();

        if (!reservations.length) {
            return res.status(404).json({ message: "No reservations found." });
        }

        res.status(200).json({ message: "All reservations retrieved successfully.", reservations });
    } catch (error) {
        console.error("Error retrieving reservations:", error);
        res.status(500).json({ message: "Error retrieving reservations. Please try again later." });
    }
};

export const validateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid reservation ID." });
        }

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found." });
        }

        reservation.status = 'confirmed';
        await reservation.save();
        res.status(200).json({ message: "Reservation validated successfully." });
    } catch (error) {
        console.error("Error validating reservation:", error);
        res.status(500).json({ message: "Error validating reservation. Please try again later." });
    }
};
