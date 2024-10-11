import {Trainstation} from "../models/trainstationModel.js";
import { resizeImage } from "../utils/resizeImage.js";
import path from 'path';

// export const addTrainstation = async (req, res) => {
//     try {
//         if (req.file) {
//             const imagePath = req.file.path;
//             const resizedImagePath = `uploads/resized-${req.file.filename}`;

//             // Appeler la fonction pour redimensionner l'image
//             await resizeImage(imagePath, resizedImagePath, 200, 200);

//             // Créer la gare avec l'image redimensionnée
//             const trainstation = await Trainstation.create({
//                 ...req.body,
//                 image: resizedImagePath
//             });

//             res.status(201).json(trainstation);
//         } else {
//             res.status(400).json({ message: 'Image is required' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


export const uploadImage = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Veuillez uploader une image" });
    }
  
    const imagePath = path.join(__dirname, "../uploads", req.file.filename);
  
    // Redimensionner l'image à 200x200 pixels
    sharp(req.file.path)
      .resize(200, 200)
      .toFile(imagePath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Erreur lors du redimensionnement de l'image" });
        }
  
        res
          .status(201)
          .json({
            message: "Image uploadée et redimensionnée avec succès",
            imagePath,
          });
      });
  };
  

  // Créer une nouvelle gare (admin uniquement)
  export const addTrainstation = async (req, res) => {
    const { name, openingHour, closingHour } = req.body;
  
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Image requise pour créer une gare" });
    }
  
    const imagePath = path.join("uploads", req.file.filename);
  
    try {
      const station = await Station.create({
        name,
        open_hour, // Validé par le modèle
        close_hour, // Validé par le modèle
        image: imagePath, // Le chemin de l'image uploadée
      });
  
      res.status(201).json(station);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de la gare",
        error: error.message,
      });
    }
  };

export const updateTrainstation = async (req, res) => {
    try {
        const trainstationId = req.params.id;
        const updatedData = { ...req.body };

        if (req.file) {
            const imagePath = req.file.path;
            const resizedImagePath = `uploads/resized-${req.file.filename}`;

            // Appeler la fonction pour redimensionner l'image
            await resizeImage(imagePath, resizedImagePath, 200, 200);

            // Mettre à jour le chemin de l'image redimensionnée
            updatedData.image = resizedImagePath;
        }

        const trainstation = await Trainstation.findByIdAndUpdate(trainstationId, updatedData, { new: true });
        if (!trainstation) {
            return res.status(404).json({ message: 'Trainstation not found' });
        } else {
            res.status(200).json(trainstation);
        }
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


