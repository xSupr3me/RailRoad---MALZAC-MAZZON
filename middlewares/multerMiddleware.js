import multer from 'multer';

// Configuration de multer pour utiliser la mémoire
const storage = multer.memoryStorage(); // On utilise la mémoire temporaire
const upload = multer({ storage: storage });

// Exportation du middleware
export const uploadMiddleware = upload.single('image'); // Nom du champ dans le formulaire
