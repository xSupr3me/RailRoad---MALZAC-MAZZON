import {Trainstation} from "../models/trainstationModel.js";
import {Train} from "../models/trainModel.js";
import {Reservation} from "../models/reservationModel.js";
import path from 'path';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';

// Configuration de multer pour stocker l'image en mémoire temporairement
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fonction pour redimensionner l'image
export const resizeImage = async (inputPath, outputPath, width, height) => {
  try {
      // Vérifie si le fichier existe avant de le redimensionner
      if (!fs.existsSync(inputPath)) {
          throw new Error(`File not found at ${inputPath}`);
      }
      await sharp(inputPath)
          .resize(width, height)
          .toFile(outputPath);
      console.log('Image resized successfully:', outputPath);
  } catch (error) {
      console.error('Error while resizing image:', error);
      throw new Error('Invalid input');
  }
};

// Fonction pour ajouter une gare avec une image redimensionnée

export const addTrainstation = async (req, res) => {
  try {
      const { name, open_hour, close_hour } = req.body;

      // Vérification si l'image a été téléchargée
      if (req.file) {
          // Chemin de l'image redimensionnée
          const resizedImagePath = path.resolve('uploads', `resized-${req.file.originalname}`);

          // Utilisation de sharp pour redimensionner l'image à partir du buffer
          await sharp(req.file.buffer)
              .resize(200, 200)
              .toFile(resizedImagePath);

          console.log('Image resized successfully to:', resizedImagePath);

          // Créer une nouvelle gare
          const trainstation = new Trainstation({
              name,
              open_hour,
              close_hour,
              image: resizedImagePath  // Ajouter le chemin de l'image redimensionnée
          });

          await trainstation.save();

          res.status(201).json({ message: 'Trainstation added successfully', trainstation });
      } else {
          res.status(400).json({ message: 'Image file is required' });
      }

  } catch (error) {
      console.error('Error while adding trainstation:', error);
      res.status(500).json({ message: error.message });
  }
};

export const updateTrainstation = async (req, res) => {
  try {
      const { id } = req.params;
      const trainstation = await Trainstation.findById(id);

      if (!trainstation) {
          return res.status(404).json({ message: 'Trainstation not found' });
      }

      // Vérifie si une nouvelle image a été uploadée
      if (req.file) {
          const resizedImagePath = path.resolve('uploads', `resized-${req.file.originalname}`);

          // Log du buffer et du chemin de l'image redimensionnée

          // Utiliser le buffer pour redimensionner l'image avec sharp
          await sharp(req.file.buffer)
              .resize(200, 200)
              .toFile(resizedImagePath);

          console.log('Image resized successfully to:', resizedImagePath);

          // Met à jour le champ image avec le nouveau chemin
          trainstation.image = resizedImagePath;
      }

      trainstation.name = req.body.name || trainstation.name;
      trainstation.open_hour = req.body.open_hour || trainstation.open_hour;
      trainstation.close_hour = req.body.close_hour || trainstation.close_hour;

      await trainstation.save();

      res.status(200).json(trainstation);
  } catch (error) {
      console.error('Error while updating trainstation:', error);
      res.status(500).json({ message: error.message });
  }
};

export const getTrainstations = async (req, res) => {
    try {
        // Récupérer les paramètres limit et page de la requête
        const limit = parseInt(req.query.limit) || 10; // Valeur par défaut à 10 si non spécifiée
        const page = parseInt(req.query.page) || 1; // Valeur par défaut à 1 si non spécifiée

        // Calculer combien de documents sauter en fonction de la page et du limit
        const skip = (page - 1) * limit;

        // Récupérer et trier les gares par nom en ordre alphabétique avec pagination
        const trainstations = await Trainstation.find()
            .sort({ name: 1 }) // Tri par nom en ordre alphabétique
            .skip(skip)         // Sauter les résultats pour la pagination
            .limit(limit);      // Limiter le nombre de résultats

        // Envoyer la réponse JSON avec les gares récupérées
        res.status(200).json(trainstations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTrainstationById = async (req, res) => {
    try {
        const trainstation = await Trainstation.findById(req.params.id);
        if (!trainstation) {
            return res.status(404).json({ message: 'Trainstation not found' });
        }
        res.status(200).json(trainstation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteTrainstation = async (req, res) => {
    try {
        const trainstationId = req.params.id;

        // Trouver la gare à supprimer
        const trainstation = await Trainstation.findById(trainstationId);
        if (!trainstation) {
            return res.status(404).json({ message: 'Trainstation not found' });
        }

        // Supprimer tous les trains associés à cette gare (en tant que départ ou arrivée)
        const trains = await Train.find({
            $or: [
                { start_station: trainstationId }, // Si la gare est la gare de départ
                { end_station: trainstationId }    // Si la gare est la gare d'arrivée
            ]
        });

        // Récupérer tous les IDs des trains associés
        const trainIds = trains.map(train => train._id);

        // Supprimer les trains correspondants
        await Train.deleteMany({
            _id: { $in: trainIds }
        });

        // Supprimer toutes les réservations liées aux trains supprimés ou à la gare
        await Reservation.deleteMany({
            $or: [
                { train: { $in: trainIds } },        // Toutes les réservations liées aux trains supprimés
                { departureStation: trainstationId },// Si la gare est la gare de départ
                { arrivalStation: trainstationId }   // Si la gare est la gare d'arrivée
            ]
        });

        // Enfin, supprimer la gare elle-même
        await trainstation.deleteOne();

        res.status(200).json({ message: 'Trainstation, associated trains, and reservations deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


