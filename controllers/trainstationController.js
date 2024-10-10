import {Trainstation} from "../models/trainstationModel.js";

export const addTrainstation = async (req, res) => {
    try {
        const trainstation = await Trainstation.create(req.body);
        res.status(201).json(trainstation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTrainstations = async (req, res) => {
    try {
        const trainstations = await Trainstation.find();
        res.status(200).json(trainstations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTrainstationById = async (req, res) => {
    try {
        const trainstation = await Trainstation.findById(req.params.id);
        res.status(200).json(trainstation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTrainstation = async (req, res) => {
    try {
        const trainstationId = req.params.id;
        const trainstation = await Trainstation.findByIdAndUpdate(trainstationId, req.body, { new: true });
        if (!trainstation) {
            return res.status(404).json({ message: 'Trainstation not found' });
        } else {
            res.status(200).json(trainstation);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTrainstation = async (req, res) => {
    try {
        const trainstationId = req.params.id;
        const trainstation = await Trainstation.findByIdAndDelete(trainstationId);
        if (!trainstation) {
            return res.status(404).json({ message: 'Trainstation not found' });
        } else {
            res.status(200).json({ message: 'Trainstation deleted' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

