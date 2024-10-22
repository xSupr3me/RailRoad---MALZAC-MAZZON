import { Reservation } from '../models/reservationModel.js';
import { Train } from '../models/trainModel.js';
import mongoose from 'mongoose';

export const createReservation = async (req, res) => {
    try {
        const { train } = req.body;

        // Vérifier si l'ID du train est valide
        const trainExists = await Train.findById(train);
        if (!trainExists) {
            return res.status(400).json({ message: "Invalid train ID." });
        }

        // Créer la réservation en récupérant les informations du train
        const reservation = new Reservation({
            user: req.user._id,
            train: trainExists._id,
            departureStation: trainExists.start_station, // Gare de départ du modèle Train
            arrivalStation: trainExists.end_station,    // Gare d'arrivée du modèle Train
            departureTime: trainExists.time_of_departure, // Heure de départ du modèle Train
        });

        await reservation.save();
        res.status(201).json({ message: "Reservation created successfully.", reservation });
    } catch (error) {
        res.status(500).json({ message: "Error creating reservation." });
    }
};

export const getUserReservations = async (req, res) => {
    try {
        // Récupérer toutes les réservations de l'utilisateur connecté
        const reservations = await Reservation.find({ user: req.user._id })

        if (!reservations.length) {
            return res.status(404).json({ message: "No reservations found for this user." });
        }

        res.status(200).json({ message: "Reservations retrieved successfully.", reservations });
    } catch (error) {
        console.error("Error retrieving user reservations:", error);
        res.status(500).json({ message: "Error retrieving user reservations." });
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
        res.status(500).json({ message: "Error cancelling reservation." });
    }
};

export const deleteReservation = async (req, res) => {
    const { id } = req.params; // Récupération de l'ID de la réservation depuis les paramètres de la requête

    try {
        // Vérifier si la réservation existe et si l'utilisateur est le propriétaire
        const reservation = await Reservation.findOneAndDelete({ _id: id, user: req.user._id });

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found or you do not have permission to delete this reservation." });
        }

        res.status(200).json({ message: "Reservation deleted successfully." });
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ message: "Error deleting reservation." });
    }
};

export const getAllReservations = async (req, res) => {
    try {
        // Récupérer toutes les réservations
        const reservations = await Reservation.find()

        if (!reservations.length) {
            return res.status(404).json({ message: "No reservations found." });
        }

        res.status(200).json({ message: "All reservations retrieved successfully.", reservations });
    } catch (error) {
        console.error("Error retrieving reservations:", error);
        res.status(500).json({ message: "Error retrieving reservations." });
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
        console.error(error); // Affiche l'erreur pour déboguer
        res.status(500).json({ message: "Error validating reservation." });
    }
};
