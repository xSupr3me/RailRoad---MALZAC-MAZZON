import sharp from 'sharp';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

export const resizeImage = async (inputPath, outputPath, width, height) => {
  try {
    // Redimensionner l'image à la taille spécifiée
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);

    console.log(`Resized image saved at: ${outputPath}`);

    // Supprimer l'image originale après redimensionnement
    await unlinkAsync(inputPath);
    console.log(`Successfully deleted: ${inputPath}`);

  } catch (error) {
    throw new Error(`Error resizing image: ${error.message}`);
  }
};
