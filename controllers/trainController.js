import { Train } from "../models/trainModel.js";

export const addTrain = async (req, res) => {
    try {
        const train = await Train.create(req.body);
        res.status(201).json(train);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTrainById = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.status(200).json(train);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTrain = async (req, res) => {
    try {
        const trainId = req.params.id;
        const train = await Train.findByIdAndUpdate(trainId, req.body, { new: true });
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        } else {
            res.status(200).json(train);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTrain = async (req, res) => {
    try {
        const trainId = req.params.id;
        const train = await Train.findByIdAndDelete(trainId);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        } else {
            res.status(200).json({ message: 'Train deleted' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    } 
}