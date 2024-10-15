import { Reservation } from '../models/reservationModel.js';
import { Train } from '../models/trainModel.js';
console.log("Train model imported:", Train); // Cela devrait afficher la fonction de modèle si l'importation réussit

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
