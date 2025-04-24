import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { initGeminiModel, analyzeCarImage } from '../utils/geminiModel'; // adjust path if needed

dotenv.config();

const router = Router();

// Initialize Gemini model once with API key
const geminiApiKey = process.env.GOOGLE_API_KEY || '';
const model = initGeminiModel(geminiApiKey);

// Setup Multer for image uploads
const upload = multer({ dest: 'uploads/' });

// POST /analyze endpoint
router.post('/analyze', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.resolve(file.path);

    const result = await analyzeCarImage(filePath, model);

    // Optionally delete the uploaded file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete uploaded file:', err);
    });

    return res.json({ result });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
