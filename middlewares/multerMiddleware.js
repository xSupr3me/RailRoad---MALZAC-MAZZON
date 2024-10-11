import multer from "multer";
import path from "path";

// Configuration de Multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où enregistrer les images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtrer pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Erreur : Seules les images sont acceptées (jpeg, jpg, png)");
  }
};

// Limiter la taille des fichiers à 1 MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB
  fileFilter: fileFilter,
});

export const uploadImage = upload.single("image");