import {Trainstation} from "../models/trainstationModel.js";
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

