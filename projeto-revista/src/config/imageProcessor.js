// src/config/imageProcessor.js

const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

const uploadFolder = path.resolve(__dirname, "..", "uploads", "imagens");

class ImageProcessor {
  static async processImage(filePath) {
    const fileName = `${Date.now()}.webp`;

    const outputPath = path.join(uploadFolder, fileName);

    await fs.mkdir(uploadFolder, { recursive: true });
    await sharp(filePath).resize(800).webp({ quality: 80 }).toFile(outputPath);

    // remove temporário
    await fs.unlink(filePath);

    return {
      filename: fileName,
      url: `/uploads/imagens/${fileName}`,
    };
  }

  static async deleteImage(imageUrl) {
    try {
      if (!imageUrl) return;

      const filename = imageUrl.split("/").pop();

      const imagePath = path.join(uploadFolder, filename);

      await fs.unlink(imagePath);
    } catch (error) {
      console.log("Erro ao deletar imagem:", error.message);
    }
  }
}

module.exports = ImageProcessor;
