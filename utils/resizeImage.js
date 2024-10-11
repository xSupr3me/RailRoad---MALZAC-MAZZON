import sharp from 'sharp';

export const resizeImage = async (inputPath, outputPath, width, height) => {
  try {
    // Redimensionner l'image à la taille spécifiée
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);

    console.log(`Resized image saved at: ${outputPath}`);

  } catch (error) {
    throw new Error(`Error resizing image: ${error.message}`);
  }
};
